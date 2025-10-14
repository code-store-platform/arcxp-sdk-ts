import type { AGallery } from '../../types/gallery.js';
import type { SectionReference } from '../../types/section.js';
import type { AStory, AnImage, Tag } from '../../types/story.js';
import type { VideoContent } from '../../types/video.js';
import type { AuthorANS } from '../author/types.js';

type TagANS = Tag & { name: string };

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

export type ANSContent = AStory | AGallery | AnImage | AuthorANS | TagANS | VideoContent;

export type PostANSPayload<ANS extends ANSContent = ANSContent> = {
  sourceId: string;
  sourceType: string;
  ANS: ANS;
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
  FailPhoto = 'FailPhoto',
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

export type DetailReport = SummaryRecord & { ansContent: ANSContent };

export type Count = {
  historical: {
    total: number;
    ansTypes: Partial<Record<ANSType, ANSTypeCount>>;
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

export type CountRequest = {
  startDate?: Date;
  endDate?: Date;
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

export type GetRemainingTimeParams = {
  priority: 'historical' | 'live';
  ansType: ANSType;
  timeUnit: 'hour' | 'day' | 'minute';
};

export type GetRemainingTimeResponse = {
  estTimeRemaining: {
    value: number;
    unit: string;
  };
  estCompletionDate: string;
  estCount: number;
  reportDate: string;
};

export type GetRecentGroupIdsResponse = {
  groupIds: string[];
};
