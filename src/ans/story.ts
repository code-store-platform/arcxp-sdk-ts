import type { Story } from '../types';
import { ArcDocument } from './doc';

/**
 * Base class for all arc stories, it provides common methods and properties
 * If you want to create a new story subtype you should extend this class
 *
 * Use case: You want to migrate stories from BBC
 * You define `class BBCStory extends ArcStory` and implement all abstract methods
 * Then you need to override the specific methods to enrich the story with the data from BBC
 *
 * For example:
 * To add tag to BBC stories you need to override
 * protected getTags(): MaybePromise<ArcTypes.Story.Tag[]> {
 *     return [{
 *       slug: 'bbc',
 *       text: 'bbc',
 *     }];
 * }
 */
export abstract class ArcStory extends ArcDocument<Story.AStory> {
  type = 'story' as const;

  async getAns() {
    const id = this.arcId;
    const publicationDate = this.getPublicationDate();
    const headlines = this.getHeadlines();
    const subheadlines = this.getSubheadlines();
    const description = this.getDescription();
    const language = this.getLanguage();
    const tags = await this.getTags();
    const subtype = await this.getSubtype();
    const label = await this.getLabel();
    const by = await this.getCreditsBy();
    const relatedContent = await this.getRelatedContent();
    const editorNote = await this.getEditorNote();
    const distributor = await this.getDistributor();
    const promoItems = await this.getPromoItems();
    const contentElements = await this.getContentElements();
    const webskedStatusCode = await this.getWebskedStatusCode();

    return {
      type: this.type,
      _id: id,
      version: this.version,
      website: this.websiteId,
      canonical_website: this.websiteId,
      language,
      subtype,
      label,
      editor_note: editorNote,
      credits: {
        by,
      },
      headlines,
      subheadlines,
      description,
      distributor,
      promo_items: promoItems,
      related_content: relatedContent,
      created_date: this.formatDate(new Date()),
      first_publish_date: this.formatDate(publicationDate),
      publish_date: this.formatDate(publicationDate),
      display_date: this.formatDate(this.getDisplayDate()),
      source: this.getSource(),
      comments: this.getComments(),
      taxonomy: {
        tags,
      },
      workflow: {
        status_code: webskedStatusCode,
      },
      content_elements: contentElements,
      additional_properties: {
        url: this.legacyUrl,
      },
    };
  }
}
