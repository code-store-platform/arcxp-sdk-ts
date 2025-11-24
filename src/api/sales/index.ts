import FormData from 'form-data';
import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api.js';
import type {
  GetAllSubscriptionsForUserParams,
  MigrateBatchSubscriptionsParams,
  MigrateBatchSubscriptionsPayload,
  MigrateBatchSubscriptionsResponse,
  SubscriptionSummary,
} from './types.js';

export class ArcSales extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'sales/api/v1' });
  }

  async migrate(params: MigrateBatchSubscriptionsParams, payload: MigrateBatchSubscriptionsPayload) {
    const form = new FormData();
    form.append('file', JSON.stringify(payload), { filename: 'subs.json', contentType: 'application/json' });

    const { data } = await this.client.post<MigrateBatchSubscriptionsResponse>('/migrate', form, {
      params,
      headers: {
        ...form.getHeaders(),
      },
    });

    return data;
  }

  async getAllSubscriptionsForUser(params?: GetAllSubscriptionsForUserParams): Promise<SubscriptionSummary> {
    const { data } = await this.client.get('/subscription/all', { params });
    return data;
  }
}
