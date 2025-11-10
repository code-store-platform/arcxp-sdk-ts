import type { ANSContent, CirculationReference, PostANSParams, PostANSPayload } from '../api/migration-center/types.js';
import type { ContentElementType } from '../content-elements/types.js';
import type { ANS } from '../types/index.js';
import type { MaybePromise, Optional } from '../types/utils.js';

/**
 * Base class for all arc entities, it provides common methods and properties
 * If you want to create a new entity subtype you should extend this class
 *
 * Use case: You want to migrate stories from BBC
 * You define `class BBCStory extends ArcDocument<ANS.AStory>` and implement all abstract methods
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
  abstract version(): ANS.DescribesTheANSVersionOfThisObject;

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

  protected getDistributor(): MaybePromise<Optional<ANS.Distributor>> {
    return;
  }

  protected getLanguage() {
    return 'en-GB';
  }

  protected getComments(): Optional<ANS.Comments> {
    return;
  }

  protected async getSource(): Promise<Optional<ANS.Source>> {
    return {
      name: 'code-store',
      system: 'code-store',
      source_id: await this.sourceId(),
    };
  }

  protected getSubheadlines(): Optional<ANS.SubHeadlines> {
    return {
      basic: '',
    };
  }

  protected getDescription(): Optional<ANS.Description> {
    return this.getSubheadlines();
  }

  protected formatDate(date?: Date) {
    if (!date) return;
    return date.toISOString();
  }

  protected getDisplayDate(): MaybePromise<Optional<Date>> {
    return new Date();
  }

  protected async getContentElements(): Promise<ContentElementType<any>[]> {
    return [];
  }

  protected getPublicationDate(): MaybePromise<Optional<Date>> {
    return new Date();
  }

  protected getHeadlines(): Optional<ANS.Headlines> {
    return {
      basic: '',
    };
  }

  protected getTags(): MaybePromise<Optional<ANS.Tag[]>> {
    return;
  }

  protected getSubtype(): MaybePromise<Optional<ANS.SubtypeOrTemplate>> {
    return;
  }

  protected getLabel(): MaybePromise<Optional<ANS.Label>> {
    return;
  }

  protected getRelatedContent(): MaybePromise<Optional<ANS.Related_Content>> {
    return;
  }

  protected async getPromoItems(): Promise<Optional<ANS.PromoItems>> {
    return;
  }

  protected getWebskedStatusCode(): MaybePromise<ANS.WorkflowInformation['status_code']> {
    return;
  }

  protected getCreditsBy(): MaybePromise<ANS.By> {
    return [];
  }

  protected getCirculations(): MaybePromise<CirculationReference[]> {
    return [];
  }

  protected getEditorNote(): MaybePromise<Optional<ANS.Editor_Note>> {
    return;
  }

  protected getContentRestrictions(): MaybePromise<Optional<ANS.ContentRestrictions>> {
    return;
  }

  protected getOwnerInformation(): MaybePromise<Optional<ANS.OwnerInformation>> {
    return;
  }

  protected getSyndication(): MaybePromise<Optional<ANS.Syndication>> {
    return;
  }

  protected getSchedulingInformation(): MaybePromise<Optional<ANS.SchedulingInformation>> {
    return;
  }

  protected getTaxonomy(): MaybePromise<Optional<ANS.Taxonomy>> {
    return;
  }
}
