export type Tag = {
  slug: string;
  name: string;
  description?: string;
  usage_counter: number;
  organization: string;
  /**
   * Path is always /.
   */
  path: string;
};

export type TagParams = {
  term: string;
};

export type DeleteTagParams = {
  path: string;
};

export type TagsResponse = {
  StatusCode: 200 | 400;
  Payload: {
    items: Tag[];
    count: string;
    next: string;
    message?: string;
  };
};

/**
 * Create new tags. The maximum limit per request is 25 tags or 16 MB of data.
 */
export type MigrateBatchTags = {
  slug: string;
  name: string;
  description?: string;
}[];
/**
 * Delete tags. The maximum limit per request is 25 tags or 16 MB of data.
 */
export type DeleteBatchTags = string[];
