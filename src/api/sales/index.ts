import platform from '../../lib/platform/index.js';
import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api.js';
import type {
  CreateEnterpriseGroupParams,
  CreateEnterpriseGroupPayload,
  CreateEnterpriseGroupResponse,
  CreateNonceResponse,
  MigrateBatchSubscriptionsParams,
  MigrateBatchSubscriptionsPayload,
  MigrateBatchSubscriptionsResponse,
} from './types.js';

export class ArcSales extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'sales/api/v1' });
  }

  async migrate(params: MigrateBatchSubscriptionsParams, payload: MigrateBatchSubscriptionsPayload) {
    const FormData = await platform.form_data();
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

  async getEnterpriseGroups(params: CreateEnterpriseGroupParams): Promise<CreateEnterpriseGroupResponse> {
    const { data } = await this.client.get<any>('/subscriptions/enterprise', {
      params: {
        'arc-site': params.site,
      },
    });
    return data;
  }

  async createEnterpriseGroup(
    params: CreateEnterpriseGroupParams,
    payload: CreateEnterpriseGroupPayload
  ): Promise<CreateEnterpriseGroupResponse> {
    const { data } = await this.client.post<CreateEnterpriseGroupResponse>('/subscriptions/enterprise', payload, {
      params: {
        'arc-site': params.site,
      },
    });
    return data;
  }

  async createNonce(website: string, enterpriseGroupId: number) {
    const { data } = await this.client.get<CreateNonceResponse>(`/subscriptions/enterprise/${enterpriseGroupId}`, {
      params: { 'arc-site': website },
    });
    return data;
  }
}
