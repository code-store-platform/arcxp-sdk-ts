import type { AStory } from '../../types/story';
import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api';
import type {
  GetStoriesByIdsParams,
  GetStoryParams,
  ScanParams,
  ScanResponse,
  SearchParams,
  SearchResponse,
} from './types';

export class ArcContent extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'content/v4' });
  }

  async getStory(params: GetStoryParams): Promise<AStory> {
    const { data } = await this.client.get('/stories', { params });
    return data;
  }

  async search(params: SearchParams): Promise<SearchResponse> {
    const { data } = await this.client.get('/search', { params });
    return data;
  }

  async scan(params: ScanParams): Promise<ScanResponse> {
    const { data } = await this.client.get('/scan', { params });
    return data;
  }

  async getStoriesByIds(params: GetStoriesByIdsParams): Promise<SearchResponse> {
    const { data } = await this.client.get('/ids', {
      params: { ...params, ids: params.ids.join(',') },
    });
    return data;
  }
}
