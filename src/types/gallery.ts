import type {
  ACollectionOfContent,
  Address,
  AliasesTrait,
  Alignment,
  CanonicalURL,
  CanonicalWebsite,
  ChannelTrait,
  Comments,
  ContentRestrictions,
  Contributors,
  CopyrightInformation,
  CreatedDate,
  CreditTrait,
  DescribesTheANSVersionOfThisObject,
  Description,
  Display_Date,
  Distributor,
  Editor_Note,
  FirstPublishDate,
  Geo,
  GloballyUniqueIDTrait,
  HasAdditionalProperties,
  Headlines,
  Label,
  LastUpdatedDate,
  Locale,
  LocationRelatedTrait,
  OwnerInformation,
  Pitches,
  PromoItems,
  Publish_Date,
  Related_Content,
  Revision,
  SchedulingInformation,
  Short_Url,
  Slug,
  Source,
  Status,
  SubHeadlines,
  SubtypeOrTemplate,
  Syndication,
  Taxonomy,
  Tracking,
  VanityCreditsTrait,
  Website,
  WebsiteURL,
  WebsitesInput,
  WorkflowInformation,
} from './story';

export interface AGallery {
  type: 'gallery';
  _id?: GloballyUniqueIDTrait;
  version: DescribesTheANSVersionOfThisObject;
  subtype?: SubtypeOrTemplate;
  channels?: ChannelTrait;
  alignment?: Alignment;
  language?: Locale;
  copyright?: CopyrightInformation;
  canonical_url?: CanonicalURL;
  canonical_website?: CanonicalWebsite;
  website?: Website;
  website_url?: WebsiteURL;
  short_url?: Short_Url;
  created_date?: CreatedDate;
  last_updated_date?: LastUpdatedDate;
  publish_date?: Publish_Date;
  first_publish_date?: FirstPublishDate;
  display_date?: Display_Date;
  location?: LocationRelatedTrait;
  geo?: Geo;
  address?: Address;
  editor_note?: Editor_Note;
  status?: Status;
  headlines?: Headlines;
  subheadlines?: SubHeadlines;
  description?: Description;
  credits?: CreditTrait;
  vanity_credits?: VanityCreditsTrait;
  taxonomy?: Taxonomy;
  promo_items?: PromoItems;
  related_content?: Related_Content;
  owner?: OwnerInformation;
  planning?: SchedulingInformation;
  workflow?: WorkflowInformation;
  pitches?: Pitches;
  revision?: Revision;
  syndication?: Syndication;
  source?: Source;
  distributor?: Distributor;
  tracking?: Tracking;
  comments?: Comments;
  label?: Label;
  slug?: Slug;
  content_restrictions?: ContentRestrictions;
  additional_properties?: HasAdditionalProperties;
  content_aliases?: AliasesTrait;
  content_elements?: ACollectionOfContent;
  websites?: WebsitesInput;
  contributors?: Contributors;
}
