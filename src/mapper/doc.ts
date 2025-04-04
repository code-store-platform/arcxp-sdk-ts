import type { ArcTypes } from '..';
import type { ANSContent, CirculationReference, PostANSParams, PostANSPayload } from '../api/migration-center/types';
import type { MaybePromise, Optional } from '../types/utils';

/**
 * Base class for all arc entities, it provides common methods and properties
 * If you want to create a new entity subtype you should extend this class
 *
 * Use case: You want to migrate stories from BBC
 * You define `class BBCStory extends ArcDocument<ArcTypes.Story.AStory>` and implement all abstract methods
 * Then you can override the specific methods to enrich the story with the data from BBC
 *
 * To migrate it call .migrate() method
 */
export abstract class Document<ANS extends ANSContent> {
  public ans: ANS | null = null;
  public circulations: CirculationReference[] = [];

  async init(): Promise<void> {
    // fetch necessary data and validate it here
  }

  abstract sourceId(): MaybePromise<string>;
  abstract sourceType(): MaybePromise<string>;
  abstract websiteId(): MaybePromise<string>;
  abstract legacyUrl(): MaybePromise<string>;
  abstract arcId(): MaybePromise<string>;
  abstract type(): MaybePromise<string>;
  abstract groupId(): MaybePromise<string>;
  abstract version(): ArcTypes.Story.DescribesTheANSVersionOfThisObject;

  abstract getAns(): MaybePromise<ANS>;

  async prepare(): Promise<{
    params: PostANSParams;
    payload: PostANSPayload<ANS>;
  }> {
    await this.init();

    const payload = await this.payload();
    const params = await this.params();

    return { payload, params };
  }

  private async payload(): Promise<PostANSPayload<ANS>> {
    this.ans = await this.getAns();
    this.circulations = await this.getCirculations();

    return {
      sourceId: await this.sourceId(),
      sourceType: await this.sourceType(),
      ANS: this.ans,
      circulations: this.circulations,
      arcAdditionalProperties: this.additionalProperties(),
    };
  }

  private async params(): Promise<PostANSParams> {
    if (!this.websiteId()) {
      throw new Error('Website is not initialized! get params() should be called after payload()!');
    }

    return {
      website: await this.websiteId(),
      groupId: await this.groupId(),
      priority: this.priority(),
    };
  }

  protected additionalProperties(): PostANSPayload['arcAdditionalProperties'] {
    return {
      story: {
        publish: false,
      },
    };
  }

  protected priority(): 'historical' | 'live' {
    return 'historical';
  }

  protected getDistributor(): MaybePromise<Optional<ArcTypes.Story.Distributor>> {
    return;
  }

  protected getLanguage() {
    return 'en-GB';
  }

  protected getComments(): Optional<ArcTypes.Story.Comments> {
    return;
  }

  protected async getSource(): Promise<Optional<ArcTypes.Story.Source>> {
    return {
      name: 'code-store',
      system: 'code-store',
      source_id: await this.sourceId(),
    };
  }

  protected getSubheadlines(): Optional<ArcTypes.Story.SubHeadlines> {
    return {
      basic: '',
    };
  }

  protected getDescription(): Optional<ArcTypes.Story.Description> {
    return this.getSubheadlines();
  }

  protected formatDate(date?: Date) {
    if (!date) return;
    return date.toISOString();
  }

  protected getDisplayDate(): Optional<Date> {
    return new Date();
  }

  protected async getContentElements(): Promise<ArcTypes.ContentElements.ContentElementType<any>[]> {
    return [];
  }

  protected getPublicationDate(): Optional<Date> {
    return new Date();
  }

  protected getHeadlines(): Optional<ArcTypes.Story.Headlines> {
    return {
      basic: '',
    };
  }

  protected getTags(): MaybePromise<Optional<ArcTypes.Story.Tag[]>> {
    return;
  }

  protected getSubtype(): MaybePromise<Optional<ArcTypes.Story.SubtypeOrTemplate>> {
    return;
  }

  protected getLabel(): MaybePromise<Optional<ArcTypes.Story.Label>> {
    return;
  }

  protected getRelatedContent(): MaybePromise<Optional<ArcTypes.Story.Related_Content>> {
    return;
  }

  protected async getPromoItems(): Promise<Optional<ArcTypes.Story.PromoItems>> {
    return;
  }

  protected getWebskedStatusCode(): MaybePromise<ArcTypes.Story.WorkflowInformation['status_code']> {
    return;
  }

  protected getCreditsBy(): MaybePromise<ArcTypes.Story.By> {
    return [];
  }

  protected getCirculations(): MaybePromise<CirculationReference[]> {
    return [];
  }

  protected getEditorNote(): MaybePromise<Optional<ArcTypes.Story.Editor_Note>> {
    return;
  }

  protected getContentRestrictions(): MaybePromise<Optional<ArcTypes.Story.ContentRestrictions>> {
    return;
  }

  protected getSchedulingInformation(): MaybePromise<Optional<ArcTypes.Story.SchedulingInformation>> {
    return;
  }

  protected getTaxonomy(): MaybePromise<Optional<ArcTypes.Story.Taxonomy>> {
    return;
  }
}
