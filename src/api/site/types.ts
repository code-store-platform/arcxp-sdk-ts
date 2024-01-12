import { Section } from '../../types/section';

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
