import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api';
import type {
  AddTagRequest,
  AddTagsResponse,
  DeleteTagRequest,
  DeleteTagsResponse,
  GetAllTagsParams,
  GetTagsResponse,
  SearchTagsParams,
} from './types';

export class ArcTags extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'tags' });
  }

  async getAllTags(params: GetAllTagsParams) {
    const { data } = await this.client.get<GetTagsResponse>('/', { params });
    return data;
  }

  async searchTags(params: SearchTagsParams) {
    const { data } = await this.client.get<GetTagsResponse>('/search', { params });
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
