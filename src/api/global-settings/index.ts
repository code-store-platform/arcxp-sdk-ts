import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api';
import type { CreateDistributorPayload, Distributor, GetDistributorsParams, GetDistributorsResponse } from './types';

export class GlobalSettings extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'settings/v1' });
  }

  async getDistributors(params?: GetDistributorsParams) {
    const { data } = await this.client.get<GetDistributorsResponse>('/distributor', { params });

    return data;
  }

  async createDistributors(payload: CreateDistributorPayload): Promise<Distributor> {
    const { data } = await this.client.post('/distributor', payload);

    return data;
  }
}
