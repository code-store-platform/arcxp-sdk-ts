import type { ANS, SectionReference } from '../../types/index.js';
import type { AuthorANS } from '../author/types.js';

type TagANS = ANS.Tag & { name: string };

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

export type ANSContent = ANS.AStory | ANS.AGallery | ANS.AnImage | AuthorANS | TagANS | ANS.VideoContent;

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
      /**
       * Video Center encoding opt-in.
       * - `true`: Video Center re-encodes the source into a rendition ladder. Arc charges for this encoding.
       * - `false`: the stream is imported as-is (a progressive MP4 becomes a single rendition, copied to Arc's CDN).
       *   Arc does not charge for importing progressive MP4 or HLS MPEG-2.
       * @see https://dev.arcxp.com/video-center/developer-docs/migrating-video-files-onto-video-center
       */
      transcoding: boolean;
      useLastUpdated?: boolean;
      importPriority?: string;
      /** Frame used as the thumbnail; mutually exclusive with an inline `promo_items.basic` image */
      thumbnailTimeInSeconds?: number;
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

export type DetailReportParams = {
  sourceId?: string;
  sourceType?: string;
  ansId?: string;
  ansType?: ANSType;
  version?: string;
  documentType?: string;
};

export type CountParams = {
  startDate?: Date;
  endDate?: Date;
};

export type SummaryReportParams = {
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
