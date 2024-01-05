import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import FormData from 'form-data';
import { MigrateBatchSubscriptionsPayload, MigrateBatchSubscriptionsResponse } from './types';

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

  async getSubscriptionDetails(id: string, site: string) {
    const response = await this.client.get(`/subscription/${id}/details`, { params: { site } });
    return response.data;
  }

  async getAllSubscriptions(id: string, site: string) {
    const response = await this.client.get('/subscription/all', { params: { site, id } });
    return response.data;
  }
}
