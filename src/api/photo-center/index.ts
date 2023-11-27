import FormData from 'form-data';
import { AnImage } from '../../types/story';
import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';

export class ArcProtoCenter extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'photo/api' });
  }
  async getImageDataById(photoId: string): Promise<AnImage> {
    const { data } = await this.client.get(`/v2/photos/${photoId}`);
    return data;
  }

  async uploadImageANS(image: AnImage) {
    const form = new FormData();
    form.append('ans', JSON.stringify(image), {
      filename: 'ans.json',
      contentType: 'application/json',
    });
    const { data } = await this.client.post<AnImage>(`/v2/photos`, form, { headers: form.getHeaders() });
    return data;
  }
}
