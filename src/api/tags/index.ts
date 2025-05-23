import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api';
import type {
  AddTagRequest,
  AddTagsResponse,
  DeleteTagRequest,
  DeleteTagsResponse,
  GetAllTagsParams,
  GetTagsResponse,
  SearchTagsParams,
  SearchTagsV2Params,
} from './types';

export class ArcTags extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'tags' });
  }

  async getAllTags(params: GetAllTagsParams) {
    const { data } = await this.client.get<GetTagsResponse>('/', { params });
    return data;
  }

  /*
   * @Deprecated
   * May return incorrect results
   * Use searchTagsV2 instead
   */
  async searchTags(params: SearchTagsParams) {
    const { data } = await this.client.get<GetTagsResponse>('/search', { params });
    return data;
  }

  async searchTagsV2(params: SearchTagsV2Params) {
    const { data } = await this.client.get<GetTagsResponse>('/v2/search', { params });
    return data;
  }

  async addTags(payload: AddTagRequest) {
    const { data } = await this.client.post<AddTagsResponse>('/add', payload);
    return data;
  }

  async deleteTags(payload: DeleteTagRequest) {
    const { data } = await this.client.post<DeleteTagsResponse>('/delete', payload);
    return data;
  }
}
