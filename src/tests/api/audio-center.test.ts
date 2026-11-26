import { AxiosError } from 'axios';
import nock from 'nock';
import { afterEach, describe, expect, test } from 'vitest';
import { ArcAPI } from '../../api';
import { ArcError } from '../../api/error';

const BASE = '/audiocenter/api/editorial';
const API = ArcAPI({ credentials: { organizationName: 'codestore', accessToken: 'token' } });
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

    const error = await API.AudioCenter.createPlaylist({ items: [] }).catch((e) => e);
    expect(error).toBeInstanceOf(ArcError);
    expect(error.message).toContain('Location');
    expect(error.responseStatus).toBe(201);
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

  test('publishClip sends explicit Accept: application/json', async () => {
    const scope = arc
      .post(`${BASE}/v1/clips/abc/publish`)
      .query({ schedule_at: '2030-01-01T00:00:00Z' })
      .matchHeader('accept', 'application/json')
      .reply(202);

    await API.AudioCenter.publishClip('abc', { schedule_at: '2030-01-01T00:00:00Z' });
    expect(scope.isDone()).toBe(true);
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

  test('uploadClipFile falls back to audio/{extension} when content_type is not returned', async () => {
    arc
      .post(`${BASE}/v1/clips/abc/upload/presigned`)
      .query({ file_name: 'a.MP3' })
      .reply(200, { upload_url: 'https://s3.example.com/up2', notification_url: 'n' });
    const upload = nock('https://s3.example.com').put('/up2').matchHeader('content-type', 'audio/mp3').reply(200);

    await API.AudioCenter.uploadClipFile('abc', 'a.MP3', new TextEncoder().encode('data'));
    expect(upload.isDone()).toBe(true);
  });

  test('uploadClipFile wraps storage errors in ArcError with cause', async () => {
    arc
      .post(`${BASE}/v1/clips/abc/upload/presigned`)
      .query({ file_name: 'a.mp3' })
      .reply(200, { upload_url: 'https://s3.example.com/up3', notification_url: 'n' });
    nock('https://s3.example.com').put('/up3').reply(403, 'SignatureDoesNotMatch');

    const error = await API.AudioCenter.uploadClipFile('abc', 'a.mp3', new TextEncoder().encode('data')).catch(
      (e) => e
    );
    expect(error).toBeInstanceOf(ArcError);
    expect(error.responseStatus).toBe(403);
    expect(error.cause).toBeInstanceOf(AxiosError);
  });
});
