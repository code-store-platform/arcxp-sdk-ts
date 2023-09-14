export type ReportStatusChangePayload = {
  storyId: string;
  sourceId: string;
  oldWorkflowStatus: number;
  newWorkflowStatus: number;
  note: string;
};