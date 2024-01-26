import FormData from 'form-data';
import { AnImage } from '../../types/story';
import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { GetGalleriesParams, GetGalleriesResponse, GetImagesParams, GetImagesResponse } from './types';

export class ArcProtoCenter extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'photo/api' });
  }
  async getImageDataById(imageId: string): Promise<AnImage> {
    const { data } = await this.client.get(`/v2/photos/${imageId}`);
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

  async deleteImage(imageId: string) {
    const { data } = await this.client.delete(`/v2/photos/${imageId}`);
    return data;
  }

  async deleteGallery(galleryId: string) {
    const { data } = await this.client.delete(`/v2/galleries/${galleryId}`);
    return data;
  }

  async getImages(params: GetImagesParams) {
    const { data } = await this.client.get<GetImagesResponse>(`/v2/photos`, { params });
    return data;
  }

  async getGalleries(params: GetGalleriesParams) {
    const { data } = await this.client.get<GetGalleriesResponse>(`/v2//galleries`, { params });
    return data;
  }
}
