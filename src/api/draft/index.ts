import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';

export class ArcDraft extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'draft/v1' });
  }

  async generateId(id: string) {
    const { data } = await this.client.get<{ id: string }>('/arcuuid', { params: { id } });
  
    return data.id;
  }
}
