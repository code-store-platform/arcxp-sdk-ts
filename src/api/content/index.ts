import { GetStoriesByIdsParams, GetStoryParams, SearchParams, SearchResponse } from './types';
import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { AStory } from '../../types/story';
import { stringify } from 'querystring';

export class ArcContent extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'content/v4' });
  }

  async getStory(params: GetStoryParams): Promise<AStory> {
    const search = stringify(params);

    const { data } = await this.client.get(`/stories?${search}`);
    return data;
  }

  async search(params: SearchParams): Promise<SearchResponse> {
    const search = stringify(params);

    const { data } = await this.client.get(`/search?${search}`);
    return data;
  }

  async getStoriesByIds(params: GetStoriesByIdsParams): Promise<SearchResponse> {
    const search = stringify({ ...params, ids: params.ids.join(',') });
    const { data } = await this.client.get(`/ids?${search}`);
    return data;
  }
}
