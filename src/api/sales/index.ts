import FormData from 'form-data';
import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api.js';
import type {
  CreateEnterpriseGroupPayload,
  CreateEnterpriseGroupResponse,
  MigrateBatchSubscriptionsParams,
  MigrateBatchSubscriptionsPayload,
  MigrateBatchSubscriptionsResponse,
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
}

export class ArcSalesV2 extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'sales/api/v2' });
  }

  async createEnterpriseGroup(payload: CreateEnterpriseGroupPayload): Promise<CreateEnterpriseGroupResponse> {
    const { data } = await this.client.post<CreateEnterpriseGroupResponse>('/subscriptions/enterprise', payload);
    return data;
  }
}
