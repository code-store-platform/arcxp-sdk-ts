import FormData from 'form-data';
import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api.js';
import type { MigrateBatchSubscriptionsPayload, MigrateBatchSubscriptionsResponse } from './types.js';

export class ArcSales extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'sales/api/v1' });
  }

  async migrate(payload: MigrateBatchSubscriptionsPayload) {
    const form = new FormData();
    form.append('file', JSON.stringify(payload), { filename: 'subs.json', contentType: 'application/json' });

    const { data } = await this.client.post<MigrateBatchSubscriptionsResponse>('/migrate', form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    return data;
  }
}
