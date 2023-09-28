import { SectionReference } from '../../types/section';
import { AStory, AnImage, Tag } from '../../types/story';

type TagANS = Tag & { name: string };

type AuthorANS = {
  type: 'author';
  _id: string;
  firstName: string;
  lastName: string;
  byline: string;
  email: string;
  affiliations: string;
  education: { name: string }[];
  awards: { name: string }[];
  bio_page: string;
  bio: string;
  longBio: string;
  slug: string;
  native_app_rendering: boolean;
  fuzzy_match: boolean;
  contributor: boolean;
  location: string;
  role: string;
  expertise: string;
  personal_website: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  status: boolean;
};

export type CirculationReference = {
  document_id: string;
  website_id: string;
  website_url?: string;
  primary_section?: SectionReference;
  website_primary_section?: SectionReference;
  website_sections: SectionReference[];
};

export type Operation = {
  type: string;
  story_id: string;
  operation: string;
  date: string;
  organization_id: string;
  endpoint: string;
};

export type PostANSPayload = {
  sourceId: string;
  sourceType: string;
  ANS: AStory | AnImage | AuthorANS | TagANS;
  references?: unknown[];
  circulations?: CirculationReference[];
  operations?: Operation[];
  arcAdditionalProperties?: {
    importPriority?: string;
    story?: {
      publish: boolean;
    };
    video?: {
      transcoding: true;
      useLastUpdated: true;
      importPriority: string;
      thumbnailTimeInSeconds: 0;
    };
  };
};

export type PostANSParams = {
  website: string;
  groupId: string;
  priority: 'historical' | 'live';
};

export type GetANSParams = {
  ansId: string;
  ansType: ANSType;
};

export enum ANSType {
  Story = 'story',
  Video = 'video',
  Tag = 'tag',
  Author = 'author',
  Gallery = 'gallery',
  Image = 'image',
  Redirect = 'redirect',
}

export enum MigrationStatus {
  Success = 'Success',
  Queued = 'Queued',
  Circulated = 'Circulated',
  Published = 'Published',
  Scheduled = 'Scheduled',
  FailVideo = 'FailVideo',
  FailImage = 'FailImage',
  FailStory = 'FailStory',
  FailGallery = 'FailGallery',
  FailAuthor = 'FailAuthor',
  FailTag = 'FailTag',
  ValidationFailed = 'ValidationFailed',
}

export type Summary = SummaryRecord[];

export type SummaryRecord = {
  id: number;
  sourceId: string;
  sourceType: string;
  sourceLocation: string;
  sourceAdditionalProperties: string;
  ansId: string;
  ansType: ANSType;
  ansLocation: string;
  status: MigrationStatus;
  website: string;
  operations: string;
  circulationLocation: string;
  createDate: string;
  updateDate: string;
  errorMessage?: string;
  priority: string;
  arcAdditionalProperties: string;
  groupId: string;
  tags?: null;
};

export type DetailReport = SummaryRecord & { ansContent: AStory | AnImage | AuthorANS | TagANS };

export type Count = {
  historical: {
    total: number;
    ansTypes: Partial<{
      tag: ANSTypeCount;
      story: ANSTypeCount;
      author: ANSTypeCount;
      image: ANSTypeCount;
    }>;
  };
};

type ANSTypeCount = Partial<Record<MigrationStatus, number>>;

export type DetailReportRequest = {
  sourceId?: string;
  sourceType?: string;
  ansId?: string;
  ansType?: ANSType;
  version?: string;
  documentType?: string;
};

export type SummaryReportRequest = {
  status?: MigrationStatus;
  website: string;
  groupId?: string;
  fetchFromId?: string;
  sort?: SummarySortBy;
  sortOrder?: SummarySortOrder;
};

export enum SummarySortBy {
  CreateDate = 'createDate',
  UpdateDate = 'updateDate',
  Id = 'id',
}

export enum SummarySortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
