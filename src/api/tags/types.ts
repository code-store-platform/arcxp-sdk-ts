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

export type SearchTagsParams = {
  term?: string;
  /**
   *  Should always set to /.
   */
  path?: string;
  /**
   *  Limit the number of items to return. Does not currently work. Check the documentation
   */
  size?: number;
};

export type GetAllTagsParams = {
  from?: string;
  /**
   *  Should always set to /.
   */
  path?: string;
  /**
   *  Limit the number of items to return. Does not currently work. Check the documentation
   */
  size?: number;
};

export type GetTagsResponse = {
  StatusCode: 200 | 400;
  Payload: {
    items: Tag[];
    count: string;
    next: string;
    message?: string;
  };
};

export type AddTagsResponse = {
  StatusCode: 200 | 400;
  Payload: {
    message?: string;
  };
};
export type DeleteTagsResponse = {
  StatusCode: 200 | 400;
  Payload: {
    message?: string;
  };
};

/**
 * Create new tags. The maximum limit per request is 25 tags or 16 MB of data.
 */
export type AddTagRequest = {
  slug: string;
  name: string;
  description?: string;
}[];
/**
 * Delete tags. The maximum limit per request is 25 tags or 16 MB of data.
 */
export type DeleteTagRequest = string[];
