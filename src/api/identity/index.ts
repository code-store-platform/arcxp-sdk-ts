import { ArcAbstractAPI, type ArcAPIOptions } from '../abstract-api.js';
import type { GetUserResponse, MigrateBatchUsersPayload, MigrateBatchUsersResponse, UserProfile } from './types.js';

export class ArcIdentity extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'identity/api/v1' });
  }

  async migrateBatch(payload: MigrateBatchUsersPayload) {
    const { data } = await this.client.post<MigrateBatchUsersResponse>('/migrate', payload);

    return data;
  }

  async *migrateBatchGenerator(
    payload: MigrateBatchUsersPayload,
    batchSize = 100
  ): AsyncGenerator<MigrateBatchUsersResponse> {
    const copy = [...payload.records];

    while (copy.length) {
      const records = copy.splice(0, batchSize);
      const response = await this.migrateBatch({ records });

      yield response;
    }
  }

  async getUser(id: string): Promise<GetUserResponse> {
    const { data } = await this.client.get(`/user?search=uuid=${id}`);

    return data;
  }

  async getUserByEmail(email: string): Promise<GetUserResponse> {
    const { data } = await this.client.get(`/user?search=email=${email}`);

    return data;
  }

  async updateUserProfile(id: string, payload: Partial<UserProfile>): Promise<UserProfile> {
    const { data } = await this.client.patch(`/profile/${id}`, payload);

    return data;
  }
}
