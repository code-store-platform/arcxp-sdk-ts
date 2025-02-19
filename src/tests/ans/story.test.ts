import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ArcStory } from '../../ans/story';
import { ContentElement } from '../../content-elements';

const mocks = {
  init: vi.fn().mockResolvedValue(undefined),
  getSourceId: vi.fn().mockReturnValue('source_id'),
  getSourceType: vi.fn().mockReturnValue('source_type'),
  getWebsiteId: vi.fn().mockReturnValue('website_id'),
  getLegacyUrl: vi.fn().mockReturnValue('legacy_url'),
  getArcId: vi.fn().mockReturnValue('arc_id'),
  getGroupId: vi.fn().mockReturnValue('group_id'),
  getContentElements: vi.fn().mockResolvedValue([ContentElement.text('')]),
  post: vi.fn().mockResolvedValue(undefined),
};

class CodeStory extends ArcStory {
  version = '1.0.0' as any;
  groupId = mocks.getGroupId();
  sourceId = mocks.getSourceId();
  sourceType = mocks.getSourceType();
  websiteId = mocks.getWebsiteId();
  legacyUrl = mocks.getLegacyUrl();
  arcId = mocks.getArcId();

  init = mocks.init;
  post = mocks.post;
  getContentElements = mocks.getContentElements;
}

describe('ArcStory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Should return valid ANS', async () => {
    const story = new CodeStory();
    expect(story.sourceId).toBe('source_id');
    expect(story.sourceType).toBe('source_type');
    expect(story.websiteId).toBe('website_id');
    expect(story.legacyUrl).toBe('legacy_url');
    expect(story.arcId).toBe('arc_id');

    const ans = await story.getAns();

    expect(ans).toBeDefined();
    expect(ans.type).toBe('story');
    expect(ans._id).toBe('arc_id');
    expect(ans.version).toBe('1.0.0');

    expect(mocks.getSourceId).toBeCalledTimes(1);
    expect(mocks.getSourceType).toBeCalledTimes(1);
    expect(mocks.getWebsiteId).toBeCalledTimes(1);
    expect(mocks.getLegacyUrl).toBeCalledTimes(1);
    expect(mocks.getArcId).toBeCalledTimes(1);
    expect(mocks.getGroupId).toBeCalledTimes(1);
  });

  test('migrate() should call post, getAns', async () => {
    const story = new CodeStory();
    const getAns = vi.spyOn(story, 'getAns');
    const payload = vi.spyOn(story, 'payload' as any);
    const params = vi.spyOn(story, 'params' as any);
    await story.migrate();

    expect(mocks.post).toBeCalledTimes(1);
    expect(mocks.init).toBeCalledTimes(1);
    expect(getAns).toBeCalledTimes(1);
    expect(payload).toBeCalledTimes(1);
    expect(params).toBeCalledTimes(1);
    expect(mocks.getContentElements).toBeCalledTimes(1);
  });
});
