import { describe, expect, test, vi } from 'vitest';
import { ArcAPI } from '../../api';

const params = { website: 'site', groupId: 'g', priority: 'historical' as const };
const video = { type: 'video', version: '0.8.0', _id: 'X' } as any;

const setup = () => {
  const api = ArcAPI({ credentials: { organizationName: 'org', accessToken: 'token' } });
  const post = vi.spyOn((api.MigrationCenter as any).client, 'post').mockResolvedValue({ data: {} });
  return { api, post };
};

describe('MigrationCenter.postAns', () => {
  test('defaults video imports to transcoding: false', async () => {
    const { api, post } = setup();
    await api.MigrationCenter.postAns(params, {
      sourceId: '1',
      sourceType: 's',
      ANS: video,
      arcAdditionalProperties: { video: { useLastUpdated: true } },
    });
    expect(post.mock.calls[0][1]).toMatchObject({
      arcAdditionalProperties: { video: { transcoding: false, useLastUpdated: true } },
    });
  });

  test('keeps an explicit transcoding: true', async () => {
    const { api, post } = setup();
    await api.MigrationCenter.postAns(params, {
      sourceId: '1',
      sourceType: 's',
      ANS: video,
      arcAdditionalProperties: { video: { transcoding: true } },
    });
    expect(post.mock.calls[0][1].arcAdditionalProperties.video.transcoding).toBe(true);
  });

  test('leaves non-video payloads untouched', async () => {
    const { api, post } = setup();
    const payload = { sourceId: '1', sourceType: 's', ANS: { type: 'story', version: '0.10.9' } as any };
    await api.MigrationCenter.postAns(params, payload);
    expect(post.mock.calls[0][1]).toBe(payload);
  });
});
