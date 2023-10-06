import { AGallery } from '../../types/gallery';
import { ARedirectObject, AStory } from '../../types/story';

export type GetStoryParams = {
  _id: string;
  published: boolean;
  website: string;
};

export type SearchParams = {
  website: string;
  q?: string;
  body?: string;
  sort?: string;
  from?: number;
  size?: number;
  single?: boolean;
  _sourceInclude?: string;
  _sourceExclude?: string;
  include_distributor_name?: string;
  exclude_distributor_name?: string;
  include_distributor_category?: string;
  exclude_distributor_category?: string;
};

export type SearchResponse = {
  type: 'results';
  content_elements: (AStory | AGallery | ARedirectObject)[];
};
