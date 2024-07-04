export type ScheduleOperationPayload = {
  type: 'story_operation' | 'gallery-operation' | 'image-operation';
  story_id?: string;
  _id?: string;
  operation: 'unpublish_edition' | 'publish_edition' | 'update';
  date: string; // 'YYYY-MM-DDT00:00:00.000000+00:00';
};

export type UnscheduleOperationPayload = Partial<Pick<ScheduleOperationPayload, 'type' | '_id' | 'story_id'>>;
