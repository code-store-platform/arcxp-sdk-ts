import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { ScheduleOperationPayload, UnscheduleOperationPayload } from './types';

export class ArcContentOps extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'contentops/v1' });
  }

  async schedulePublish(payload: ScheduleOperationPayload) {
    const { data } = await this.client.put<void>(`/publish`, payload);

    return data;
  }

  async scheduleUnpublish(payload: ScheduleOperationPayload) {
    const { data } = await this.client.put<void>(`/unpublish`, payload);

    return data;
  }

  async unscheduleUnpublish(payload: UnscheduleOperationPayload) {
    const { data } = await this.client.put<void>(`/unschedule_unpublish`, payload);

    return data;
  }

  async unschedulePublish(payload: UnscheduleOperationPayload) {
    const { data } = await this.client.put<void>(`/unschedule_publish`, payload);

    return data;
  }
}
