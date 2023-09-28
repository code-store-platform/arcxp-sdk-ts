import { GetStoryParams } from './types';
import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { AStory } from '../../types/story';

export class ArcContent extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'content/v4' });
  }

  async getStory(params: GetStoryParams): Promise<AStory> {
    const search = new URLSearchParams({ ...params, published: params.published.toString() }).toString();

    const { data } = await this.client.get(`/stories?${search}`);
    return data;
  }
}
