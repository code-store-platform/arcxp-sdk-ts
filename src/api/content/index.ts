import { GetStoryParams } from './types';
import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';

export class ArcContent extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'content/v4' });
  }

  async getStory(params: GetStoryParams) {
    const search = new URLSearchParams({ ...params, published: params.published.toString() }).toString();

    const { data } = await this.client.get(`/stories?${search}`);
    return data;
  }
}
