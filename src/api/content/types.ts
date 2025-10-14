import type { AGallery } from '../../types/gallery.js';
import type { ARedirectObject, AStory } from '../../types/story.js';

export type GetStoryParams = {
  /** Specifies the ID of the website making the request. Required. */
  website: string;
  /** Specifies the Arc ID of the target document. Either _id or website_url must be provided. */
  _id?: string;
  /** The relative URL path of the document on the specified website. Either _id or website_url must be provided. */
  website_url?: string;
  /** Determines whether to return published or draft documents. Defaults to true. */
  published?: boolean;
  /** A comma-separated list of fields to include in the response. Improves performance when specified. */
  included_fields?: string;
};

export type GetStoriesByIdsParams = {
  ids: string[];
  published?: boolean;
  website: string;
  included_fields?: string;
};

export type SearchParams = {
  website: string;
  q?: string;
  body?: string;
  sort?: string;
  from?: number;
  size?: number;
  single?: boolean;
  track_total_hits?: boolean;
  _sourceInclude?: string;
  _sourceExclude?: string;
  include_distributor_name?: string;
  exclude_distributor_name?: string;
  include_distributor_category?: string;
  exclude_distributor_category?: string;
};

export type ScanParams = {
  website: string;
  q?: string;
  body?: string;
  scrollId?: string;
  size?: number;
};

export type SearchResponse = {
  type: 'results';
  content_elements: (AStory | AGallery | ARedirectObject)[];
  count: number;
  next?: number;
  previous?: number;
};

export type ScanResponse = {
  type: 'results';
  content_elements: (AStory | AGallery | ARedirectObject)[];
  count: number;
  next: string;
};
