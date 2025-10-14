import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api.js';
import type { ScheduleOperationPayload, UnscheduleOperationPayload } from './types.js';

export class ArcContentOps extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'contentops/v1' });
  }

  async schedulePublish(payload: ScheduleOperationPayload) {
    const { data } = await this.client.put<void>('/publish', payload);

    return data;
  }

  async scheduleUnpublish(payload: ScheduleOperationPayload) {
    const { data } = await this.client.put<void>('/unpublish', payload);

    return data;
  }

  async unscheduleUnpublish(payload: UnscheduleOperationPayload) {
    const { data } = await this.client.put<void>('/unschedule_unpublish', payload);

    return data;
  }

  async unschedulePublish(payload: UnscheduleOperationPayload) {
    const { data } = await this.client.put<void>('/unschedule_publish', payload);

    return data;
  }
}
