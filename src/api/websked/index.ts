import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { ReportStatusChangePayload } from './types';

export class ArcWebsked extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'websked' });
  }

  async reportStatusChange(payload: ReportStatusChangePayload) {
    const { data } = await this.client.post('/tasks/workflowStatusChange', payload);
    return data;
  }
}
