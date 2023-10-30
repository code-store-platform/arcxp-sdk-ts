import { AnImage } from '../../types/story';
import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';

export class ArcProtoCenter extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'photo/api' });
  }
  async getImageMetadata(photoId: string): Promise<AnImage> {
    const { data } = await this.client.get(`/v2/photos/${photoId}`);
    return data;
  }
}
