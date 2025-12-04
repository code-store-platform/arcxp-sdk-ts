import nock from 'nock';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { ArcAPI } from '../../api';

describe('Arc API retry logic', () => {
  const org = 'codestore';
  const base = `https://api.${org}.arcpublishing.com`;
  const accessToken = '123456';

  beforeEach(() => {
    nock.cleanAll();
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  test('retries on 429 and recovers (2x429 => 200)', async () => {
    const idParam = Date.now().toString();
    nock(base)
      .get(/.*/)
      .reply(429, { message: 'Too Many Requests' })
      .get(/.*/)
      .reply(429, { message: 'Too Many Requests' })
      .get(/.*/)
      .reply(200, { id: idParam });

    const API = ArcAPI({
      credentials: { organizationName: org, accessToken },
    });

    const result = await API.Draft.generateId(idParam);

    expect(result).toEqual(idParam);
    expect(nock.isDone()).toBe(true);
  });

  test('fails after max retries (always 429)', async () => {
    nock(base).get(/.*/).times(3).reply(429, { message: 'Too Many Requests' });

    const API = ArcAPI({
      credentials: { organizationName: org, accessToken },
      maxRetries: 2,
    });

    await expect(API.Draft.generateId(Date.now().toString())).rejects.toMatchObject({
      name: 'ArcDraftError',
      service: 'ArcDraft',
      responseData: { message: 'Too Many Requests' },
      responseStatus: 429,
    });

    expect(nock.isDone()).toBe(true);
  }, 15000); // 15s timeout
});
