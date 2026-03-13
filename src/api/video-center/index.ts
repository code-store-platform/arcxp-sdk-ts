import { ArcAbstractAPI, type ArcAPIOptions } from '../abstract-api.js';
import type { DeleteVideoParams, ImportVideoParams, ImportVideoPayload, UpdateVideoUrlParams } from './types.js';

export class ArcVideoCenter extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'goldfish' });
  }

  async importVideo(payload: ImportVideoPayload, params: ImportVideoParams): Promise<void> {
    await this.client.post('/video/v2/import/ans', payload, { params });
  }

  async deleteVideo(params: DeleteVideoParams): Promise<void> {
    await this.client.delete('/video/v2/import/ans', { params });
  }

  async updateVideoUrl(params: UpdateVideoUrlParams): Promise<void> {
    await this.client.post('/video/v2/url/update', undefined, { params });
  }
}
