import nock from 'nock';
import { afterEach, describe, expect, test } from 'vitest';
import { ArcAPI } from '../../api';

const BASE = '/audiocenter/api/editorial';
const API = ArcAPI({ credentials: { organizationName: 'codestore', accessToken: 'token' }, maxRetries: 0 } as never);
const arc = nock('https://api.codestore.arcpublishing.com');

describe('Arc Audio Center', () => {
  afterEach(() => nock.cleanAll());

  test('createClip returns id parsed from Location header', async () => {
    arc
      .post(`${BASE}/v1/clips/`, { title: 'Clip' })
      .reply(201, '', { Location: `https://x.com${BASE}/v1/clips/abc123` });

    await expect(API.AudioCenter.createClip({ title: 'Clip' })).resolves.toEqual({ id: 'abc123' });
  });

  test('createPlaylist throws without Location header', async () => {
    arc.post(`${BASE}/v1/playlists/`).reply(201);

    await expect(API.AudioCenter.createPlaylist({ items: [] })).rejects.toThrow('Location');
  });

  test('listClips sends array filters as repeated keys', async () => {
    arc
      .get(`${BASE}/v1/clips/`)
      .query((q) => JSON.stringify(q.sites) === JSON.stringify(['a', 'b']) && q.max_results === '5')
      .reply(200, { data: [], next_page_token: null });

    await expect(API.AudioCenter.listClips({ sites: ['a', 'b'], max_results: 5 })).resolves.toEqual({
      data: [],
      next_page_token: null,
    });
  });

  test('uploadClipFile uploads to presigned url without Authorization', async () => {
    arc
      .post(`${BASE}/v1/clips/abc/upload/presigned`)
      .query({ file_name: 'a.mp3' })
      .reply(200, { upload_url: 'https://s3.example.com/up?sig=1', content_type: 'audio/mpeg', notification_url: 'n' });
    const upload = nock('https://s3.example.com', { badheaders: ['authorization'] })
      .put('/up', 'data')
      .query({ sig: '1' })
      .matchHeader('content-type', 'audio/mpeg')
      .reply(200);

    await API.AudioCenter.uploadClipFile('abc', 'a.mp3', new TextEncoder().encode('data'));
    expect(upload.isDone()).toBe(true);
  });
});
