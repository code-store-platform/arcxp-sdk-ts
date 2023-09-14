import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';

export class ArcAuthor extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'author' });
  }

  async delete(userId: string): Promise<void> {
    const { data } = await this.client.delete(`/v2/author-service/${userId}`);

    return data;
  }
}
