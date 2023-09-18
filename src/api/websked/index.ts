import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { CreateTaskPayload, CreateTaskResponse, ReportStatusChangePayload } from './types';

export class ArcWebsked extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'websked' });
  }

  async reportStatusChange(payload: ReportStatusChangePayload): Promise<void> {
    return this.client.post('/tasks/workflowStatusChange', payload);
  }

  async createTask(payload: CreateTaskPayload): Promise<CreateTaskResponse> {
    const { data } = await this.client.post('/tasks', payload);
    return data;
  }
}
