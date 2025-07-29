import FormData from 'form-data';
import path from 'node:path';
import { type ReadStream } from 'node:fs';
import type { AGallery } from '../../types/gallery';
import type { AnImage } from '../../types/story';
import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api';
import type { GetGalleriesParams, GetGalleriesResponse, GetImagesParams, GetImagesResponse } from './types';

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
    const { data } = await this.client.post<AnImage>('/v2/photos', form, { headers: form.getHeaders() });
    return data;
  }

  async uploadImageStream(
    readableStream: ReadStream,
    options?: { contentType?: string; filename?: string }
  ): Promise<AnImage> {
    const form = new FormData();
    const contentType = options?.contentType ?? 'application/octet-stream';
    const filename = path.basename(String(options?.filename || readableStream.path || 'file.jpg'));

    form.append('file', readableStream, {
      filename: filename,
      contentType,
    });

    const { data } = await this.client.post('/v2/photos', form, { headers: form.getHeaders() });

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
    const { data } = await this.client.get<GetImagesResponse>('/v2/photos', { params });
    return data;
  }

  async getGalleries(params: GetGalleriesParams) {
    const { data } = await this.client.get<GetGalleriesResponse>('/v2/galleries', { params });
    return data;
  }

  async getGallery(galleryId: string) {
    const { data } = await this.client.get<AGallery>(`/v2/galleries/${galleryId}`);
    return data;
  }

  async updateImage(imageId: string, photoDto: AnImage) {
    const { data } = await this.client.put<AnImage>(`/v2/photos/${imageId}`, photoDto);
    return data;
  }
}
