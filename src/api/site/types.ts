import type { Section } from '../../types/section';

export type Website = {
  _id: string;
  display_name: string;
  base_path: string;
  is_default_website: boolean;
  domains: string[];
};

export type GetSectionsResponse = {
  count: number;
  limit: number;
  offset: number;
  total_count: number;
  q_results: Section[];
};

export type Link = {
  _id: string;
  _website: string;
  url: string;
  display_name: string;
  parent: Record<string, string | number | boolean>;
  order: Record<string, string | number | boolean>;
};

export type GetLinksParams = {
  website: string;
  offset?: number;
  limit?: number;
};

export type GetLinksResponse = {
  q_results: Link[];
};
