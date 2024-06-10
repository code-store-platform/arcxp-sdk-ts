import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { ListAuthorsParams, ListAuthorsResponse } from './types';

export class ArcAuthor extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'author' });
  }

  async listAuthors(params?: ListAuthorsParams): Promise<ListAuthorsResponse> {
    const { data } = await this.client.get(`/v2/author-service`, { params });

    return data;
  }

  async delete(userId: string): Promise<void> {
    const { data } = await this.client.delete(`/v2/author-service/${userId}`);

    return data;
  }
}
