export type ReportStatusChangePayload = {
  storyId: string;
  sourceId: string;
  oldWorkflowStatus: number;
  newWorkflowStatus: number;
  note: string;
};

export type WebskedEvent = {
  priority: number;
  startDate?: number;
  deadline?: number;
  assignedGroup?: string;
  assignedUser?: string;
  datetime: number;
  user: object;
  note: string;
  status: number;
  customFields: Record<
    string,
    {
      value: string;
    }
  >;
};

export type CreateTaskResponse = {
  id: string;
  storyID: string;
  type: number;
  createdDate: number;
  events: WebskedEvent[];
  latestEvent: WebskedEvent;
  creationEvent: WebskedEvent;
  taskTemplateId: string | null;
  website: string;
  authoringApp: string;
  startDate: number;
  content: {
    type: 'ans';
    contentId: string;
    versionId: null;
  };
};

export type CreateTaskPayload = {
  priority: number;
  startDate?: number;
  deadline?: number;
  assignedGroup: string;
  note: string;
  status: number;
  customFields: {
    sourceId: {
      value: string;
    };
  };
  type: number;
  storyID: string;
  content: {
    type: 'ans';
    contentId: string;
  };
  website: string;
  authoringApp: string;
};

export interface WebskedStory {
  id: string;
  analytics: null;
  cms: string;
  cmsEditURL: string;
  contentType: string;
  creators: WebskedStoryCreator[];
  dates: WebskedStoryDates;
  distributorId: string;
  editors: string | null;
  headline: string;
  html: string;
  location: string | null;
  media: WebskedStoryMedia;
  closedPlans: string[];
  openPlans: string[] | null;
  sections: WebskedStorySection[];
  originatingPlan: string;
  primarySection: WebskedStorySection;
  slug: string | null;
  source: string;
  sourceId: string;
  sourceName: string;
  sourceType: string;
  sponsored: boolean;
  status: WebskedStoryStatus;
  storyLength: WebskedStoryLength;
  summary: string;
  url: string;
  usage: number | null;
  publicationPitches: WebskedPublicationPitch[] | null;
  pitches: WebskedPublicationPitch[] | null;
  pitchCount: number | null;
  kill: number | null;
  stats: WebskedStoryStats;
  plannedTimeChangeLog: number | null;
  ansNote: string;
  note: string | null;
  tags: string[] | null;
  promoImage: string;
  budgetLine: string | null;
  subtype: string;
  subheadline: string;
  leadArt: string | null;
  leadArtType: string | null;
  leadArtResizedURL: string | null;
  ownerName: string | null;
}

export interface WebskedStoryCreator {
  contributorId: string | null;
  email: string | null;
  itemRole: string | null;
  name: string;
  role: string;
}

export interface WebskedStoryDates {
  created: number;
  planned: number | null;
  published: number;
  scheduled: number | null;
  updated: number;
  websked: number;
  firstPublish: number;
  latestPublish: number;
}

export interface WebskedStoryMedia {
  galleries: unknown[];
  graphics: unknown[];
  images: WebskedStoryImage[];
  videos: unknown[];
  willHaveGalleries: boolean;
  willHaveGraphics: boolean;
  willHaveImages: boolean;
  willHaveVideos: boolean;
}

export interface WebskedStorySection {
  id: string;
  website: string;
  name: string;
}

export interface WebskedStoryStatus {
  publish: number;
  publishRaw: number | null;
  workflow: number;
  workflowRaw: number | null;
  live: boolean;
  note: string | null;
  paywallStatus: string;
}

export interface WebskedStoryLength {
  planned: number | null;
  actual: number | null;
  characterCountPlanned: number | null;
  characterCountActual: number;
  wordCountPlanned: number | null;
  wordCountActual: number;
  inchCountPlanned: number | null;
  inchCountActual: number;
  lineCountPlanned: number | null;
  lineCountActual: number;
}

export interface WebskedPublicationPitch {
  publicationId: string;
  currentStatus: string;
  currentEdition: string;
}

export interface WebskedStoryStats {
  deadlineMiss: number | null;
  creationToPublish: number;
}

export interface WebskedStoryImage {
  title: string | null;
  caption: string;
  url: string;
  creators: WebskedStoryCreator[];
  height: number;
  width: number;
  location: (string | null)[];
}

export type SectionStoriesPayload = {
  id: string;
  publicationId: string;
  sectionId: string;
  publicationTime: 1698138000;
  closed: boolean;
  finalized: boolean;
  pitchedCount: number;
  pitchedStories: string[];
  note: string | null;
  storyIds: string[];
  stories?: WebskedStory[];
};
