import type { ANSContent } from '../api/migration-center/types.js';
import type { ANS } from '../types/index.js';
import { Document } from './doc.js';

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
export abstract class Story<ANS extends ANSContent = ANS.AStory> extends Document<ANS> {
  type() {
    return 'story' as const;
  }

  async getAns() {
    const id = await this.arcId();
    const version = this.version();
    const type = this.type();
    const publicationDate = await this.getPublicationDate();
    const displayDate = await this.getDisplayDate();
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
    const websiteId = await this.websiteId();
    const source = await this.getSource();
    const comments = await this.getComments();
    const legacyUrl = await this.legacyUrl();
    const owner = await this.getOwnerInformation();
    const syndication = await this.getSyndication();
    const contentRestrictions = await this.getContentRestrictions();
    const planning = await this.getSchedulingInformation();
    const taxonomy = await this.getTaxonomy();
    const additionalMetaProperties = await this.getMigrationMetaProperties();

    return {
      type,
      _id: id,
      version,
      website: websiteId,
      canonical_website: websiteId,
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
      planning,
      promo_items: promoItems,
      related_content: relatedContent,
      content_restrictions: contentRestrictions,
      created_date: this.formatDate(new Date()),
      first_publish_date: this.formatDate(publicationDate),
      publish_date: this.formatDate(publicationDate),
      display_date: this.formatDate(displayDate),
      source,
      comments,
      owner,
      syndication,
      taxonomy: {
        ...taxonomy,
        tags,
      },
      workflow: {
        status_code: webskedStatusCode,
      },
      content_elements: contentElements,
      additional_properties: {
        url: legacyUrl,
        ...additionalMetaProperties,
      },
    } as unknown as ANS;
  }

  protected async getMigrationMetaProperties(): Promise<Record<string, any>> {
    return {
      // used in dashboard for migration
      migration_source_id: await this.sourceId(),
      migration_source_type: await this.sourceType(),
      // used in dashboard to show the original url
      migration_url: await this.legacyUrl(),
      migration_group_id: await this.groupId(),
    };
  }
}
