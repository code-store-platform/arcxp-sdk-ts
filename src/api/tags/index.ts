import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { DeleteBatchTags, MigrateBatchTags, TagsResponse } from './types';

export class ArcTags extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'tags' });
  }
  async getTags(term: string) {
    const { data } = await this.client.get<TagsResponse>(`/search`, { params: { term } });
    return data;
  }

  async migrateBatch(payload: MigrateBatchTags) {
    const { data } = await this.client.post(`/add`, payload);
    return data;
  }

  async deleteBatch(payload: DeleteBatchTags) {
    const { data } = await this.client.post(`/delete`, payload);
    return data;
  }
}
