import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { MigrateBatchUsersPayload, MigrateBatchUsersResponse } from './types';

export class ArcIdentity extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'identity/api/v1' });
  }

  async migrateBatch(payload: MigrateBatchUsersPayload) {
    const { data } = await this.client.post<MigrateBatchUsersResponse>('/migrate', payload);

    return data;
  }
}
