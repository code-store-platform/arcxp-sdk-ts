import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ContentElement } from '../../content-elements';
import { Story } from '../../mapper';

describe('Mapper', () => {
  const ans = {
    type: 'story',
    _id: 'arc_id',
    version: '1.0.0',
    website: 'website_id',
    canonical_website: 'website_id',
    language: 'en-GB',
    subtype: 'subtype',
    credits: { by: [] },
    headlines: { basic: '' },
    subheadlines: { basic: '' },
    description: { basic: '' },
    created_date: expect.any(String),
    first_publish_date: expect.any(String),
    publish_date: expect.any(String),
    display_date: expect.any(String),
    source: { name: 'code-store', system: 'code-store', source_id: 'source_id' },
    taxonomy: { tags: [] },
    workflow: expect.any(Object),
    content_elements: [{ type: 'text', content: '', alignment: 'left' }],
    additional_properties: { url: 'legacy_url' },
  };

  const mocks = {
    init: vi.fn().mockResolvedValue(undefined),
    getSourceId: vi.fn().mockResolvedValue('source_id'),
    getSourceType: vi.fn().mockResolvedValue('source_type'),
    getWebsiteId: vi.fn().mockResolvedValue('website_id'),
    getLegacyUrl: vi.fn().mockResolvedValue('legacy_url'),
    getArcId: vi.fn().mockResolvedValue('arc_id'),
    getGroupId: vi.fn().mockResolvedValue('group_id'),
    getSubtype: vi.fn().mockResolvedValue('subtype'),
    getContentElements: vi.fn().mockResolvedValue([ContentElement.text('')]),
    getTaxonomy: vi.fn().mockResolvedValue({}),
    getTags: vi.fn().mockResolvedValue([]),
  };

  class CodeStory extends Story {
    version = () => '1.0.0' as any;
    groupId = mocks.getGroupId;
    sourceId = mocks.getSourceId;
    sourceType = mocks.getSourceType;
    websiteId = mocks.getWebsiteId;
    legacyUrl = mocks.getLegacyUrl;
    arcId = mocks.getArcId;

    init = mocks.init;
    getSubtype = mocks.getSubtype;
    getContentElements = mocks.getContentElements;
    getTaxonomy = mocks.getTaxonomy;
    getTags = mocks.getTags;
  }

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Should return valid ANS', async () => {
    const story = new CodeStory();

    const ans = await story.getAns();

    expect(ans).toBeDefined();
    expect(ans.type).toBe('story');
    expect(ans._id).toBe('arc_id');
    expect(ans.version).toBe('1.0.0');
  });

  test('prepare() should call params, payload, getAns', async () => {
    const story = new CodeStory();
    const getAns = vi.spyOn(story, 'getAns');
    const payload = vi.spyOn(story, 'payload' as any);
    const params = vi.spyOn(story, 'params' as any);
    const result = await story.prepare();

    expect(mocks.init).toBeCalledTimes(1);
    expect(getAns).toBeCalledTimes(1);
    expect(payload).toBeCalledTimes(1);
    expect(params).toBeCalledTimes(1);
    expect(mocks.getContentElements).toBeCalledTimes(1);
    expect(mocks.getTaxonomy).toBeCalledTimes(1);
    expect(mocks.getTags).toBeCalledTimes(1);

    expect(result.params).toBeDefined();
    expect(result.params.website).toBe('website_id');
    expect(result.params.groupId).toBe('group_id');
    expect(result.params.priority).toBe('historical');

    expect(result.payload).toBeDefined();
    expect(result.payload.sourceId).toBe('source_id');
    expect(result.payload.sourceType).toBe('source_type');
    expect(result.payload.ANS).toMatchObject(ans);
  });
});
