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
