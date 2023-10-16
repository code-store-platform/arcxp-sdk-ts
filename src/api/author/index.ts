import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { AuthorANS } from '../migration-center/types';

export class ArcAuthor extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'author' });
  }

  async listAuthors(): Promise<AuthorANS[]> {
    const { data } = await this.client.get(`/v2/author-service`);

    return data.authors;
  }

  async delete(userId: string): Promise<void> {
    const { data } = await this.client.delete(`/v2/author-service/${userId}`);

    return data;
  }
}
