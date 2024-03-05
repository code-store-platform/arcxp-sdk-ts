import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { DeleteTagRequest, GetTagsParams, AddTagRequest, GetTagsResponse } from './types';

export class ArcTags extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'tags' });
  }
  async getTags(params: GetTagsParams) {
    const { data } = await this.client.get<GetTagsResponse>(`/search`, { params });
    return data;
  }

  async addTags(payload: AddTagRequest) {
    const { data } = await this.client.post(`/add`, payload);
    return data;
  }

  async deleteTags(payload: DeleteTagRequest) {
    const { data } = await this.client.post(`/delete`, payload);
    return data;
  }
}
