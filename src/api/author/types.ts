export type ListAuthorsParams = Partial<{
  sort_by: 'lastName' | 'last_updated_date';
  order: 'asc' | 'desc';
  byline: string;
  email: string;
  firstName: string;
  lastName: string;
  slug: string;
  include_inactive: boolean;
  limit: number;
  last: string;
}>;

export type ListAuthorsResponse = {
  authors: AuthorANS[];
  more?: boolean;
  last?: string;
};

export type CreateAuthorPayload = Omit<AuthorANS, 'last_updated_date'>;

export type UpdateAuthorPayload = Partial<Omit<AuthorANS, '_id' | 'last_updated_date'>>;

export type GetAuthorParams = {
  _id: string;
};

export type AuthorConfigurationResponse = {
  q_results: AuthorFieldConfig[];
  count: number;
  limit: number;
  offset: number;
  total_count: number;
};

export type AuthorFieldConfig = {
  _id: string;
  key: string;
  label?: string;
  type?: string;
  required?: boolean;
  hidden?: boolean;
  placeholder?: string;
  default?: string;
  max?: number;
  versionAdded?: number;
  picklist_options?: { value: string; label: string }[];
};

export type AuthorANS = {
  type: 'author';
  _id: string;
  firstName: string;
  lastName: string;
  byline: string;
  slug: string;
  email: string;
  image?: string;
  url?: string;
  middleName?: string;
  suffix?: string;
  affiliations?: string;
  author_type?: string;
  education?: { name: string }[];
  awards?: { name: string }[];
  books?: { title: string; url?: string; publisher?: string }[];
  podcasts?: { name?: string; url?: string; download_url?: string }[];
  bio_page?: string;
  bio?: string;
  longBio?: string;
  native_app_rendering?: boolean;
  fuzzy_match?: boolean;
  contributor?: boolean;
  location?: string;
  role?: string;
  expertise?: string;
  languages?: string;
  beat?: string;
  personal_website?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  tumblr?: string;
  pinterest?: string;
  soundcloud?: string;
  instagram?: string;
  rss?: string;
  snapchat?: string;
  whatsapp?: string;
  medium?: string;
  reddit?: string;
  last_updated_date?: string;
  status?: boolean;
};
