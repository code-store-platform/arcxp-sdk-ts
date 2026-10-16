import nock from 'nock';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { ArcAPI } from '../../api';

describe('Arc Site API', () => {
  const org = 'codestore';
  const base = `https://api.${org}.arcpublishing.com/site/v3`;
  const credentials = { organizationName: org, accessToken: '123456' };

  beforeEach(() => {
    nock.cleanAll();
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  test('setDefaultWebsite calls PUT /website/{id}/set-default', async () => {
    nock(base).put('/website/new-site/set-default').reply(200, { _id: 'new-site', is_default_website: true });

    const API = ArcAPI({ credentials });
    const result = await API.Site.setDefaultWebsite('new-site');

    expect(result).toEqual({ _id: 'new-site', is_default_website: true });
    expect(nock.isDone()).toBe(true);
  });

  test('removeWebsiteFromGroup and deleteHierarchy use the documented paths', async () => {
    nock(base).delete('/website-group/group-1/website/old-site').reply(200, {});
    nock(base).delete('/hierarchy/old-nav').reply(200, {});

    const API = ArcAPI({ credentials });
    await API.Site.removeWebsiteFromGroup('group-1', 'old-site');
    await API.Site.deleteHierarchy('old-nav');

    expect(nock.isDone()).toBe(true);
  });

  test('section ids are encoded, so spaces and a trailing space survive', async () => {
    nock(base).delete('/website/old-site/section').query({ _id: "/Suppliers/Sophie's Cakes " }).reply(200, {});

    const API = ArcAPI({ credentials });
    await API.Site.deleteSection("/Suppliers/Sophie's Cakes ", 'old-site');

    expect(nock.isDone()).toBe(true);
  });
});
