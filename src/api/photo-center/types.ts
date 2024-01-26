import { AGallery } from '../../types/gallery';
import { AnImage } from '../../types/story';

export type GetImagesParams = Partial<{
  primaryWebsite: string;
  offset: number;
  limit: number;
}>;

export type GetGalleriesParams = Partial<{
  offset: number;
  limit: number;
}>;

export type GetImagesResponse = AnImage[];

export type GetGalleriesResponse = AGallery[];
