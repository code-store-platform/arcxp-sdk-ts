export type SectionReference = {
  type: 'reference';
  referent: {
    id: string;
    website: string;
    type: 'section';
  };
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
  order?: any;
  parent?: { default?: string; footer?: null | string; header?: string };
  ancestors?: { default: []; footer: []; header: [] };
  inactive?: false;
  node_type?: 'section';
};

export type SetSection = {
  _id: string;
  website: string;
  name: string;
  parent: { default: string; footer?: null | string; header: string };
  navigation?: { nav_title: string };
  _admin?: { alias_ids: string[] };
  ancestors?: string[];
  order?: any;
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
