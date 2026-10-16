export type Website = {
  _id: string;
  display_name: string;
  base_path: string;
  is_default_website: boolean;
  domains: string[];
  default_language?: string;
};

/** A hierarchy is an org-wide name. `"*"` in `websites` means every website has it. */
export type Hierarchy = {
  _id: string;
  websites: string[];
};

export type WebsiteGroup = {
  _id: string;
  display_name: string;
  websites?: string[];
  [key: string]: unknown;
};

export type GetNavigationParams = {
  /** Root section of the returned tree. Defaults to `/`. */
  _id?: string;
  /** Defaults to `default`. */
  hierarchy?: string;
  no_empty_string?: boolean;
  fallback_default?: boolean;
};

export type NavigationNode = Section & {
  children?: NavigationNode[];
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
  count?: number;
  total_count?: number;
  limit?: number;
  offset?: number;
};

export type GetSectionParams = {
  website: string;
  offset?: number;
  limit?: number;
  include_inactive?: boolean;
};

export type SectionReference = {
  type: 'reference';
  referent: {
    id: string;
    website: string;
    type: 'section';
  };
};

export type SectionOrder = { default?: number; footer?: number; main_navigation?: number; header?: number } & {
  [key: string]: number | undefined;
};

export type SectionParent = { default?: string; footer?: null | string; main_navigation?: string; header?: string } & {
  [key: string]: string | undefined;
};

export type Section = {
  _id: string;
  site?: {
    site_url: null;
    site_keywords: null;
    site_description: string;
    site_tagline: null;
    pagebuilder_path_for_native_apps: null;
    site_about: null;
    site_title: string;
    section_collection: string;
  };
  social?: { twitter: null; rss: null; facebook: null; instagram: null };
  navigation?: { nav_title: string };
  site_topper?: { site_logo_image: null };
  _admin?: { alias_ids: string[] };
  _website?: string;
  name: string;
  order?: SectionOrder;
  parent?: SectionParent;
  ancestors?: { default: []; footer: []; header: [] };
  inactive?: false;
  node_type?: 'section';
};

export type SetSectionPayload = {
  _id: string;
  website: string;
  name: string;
  navigation?: { nav_title: string };
  _admin?: { alias_ids: string[] };
  ancestors?: string[];
  order?: SectionOrder;
  parent?: SectionParent;
  inactive?: false;
  site?: Partial<{
    site_url: null;
    site_keywords: null;
    site_description: string;
    site_tagline: null;
    pagebuilder_path_for_native_apps: null;
    site_about: null;
    site_title: string;
    section_collection: string;
  }>;
};
