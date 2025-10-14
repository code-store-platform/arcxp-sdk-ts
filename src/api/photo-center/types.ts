import type { AGallery } from '../../types/gallery.js';
import type { AnImage } from '../../types/story.js';

export type GetImagesParams = Partial<{
  primaryWebsite: string;
  offset: number;
  limit: number;
  source: string;
  sourceName: string;
  sourceType: string;
}>;

export type GetGalleriesParams = Partial<{
  offset: number;
  limit: number;
}>;

export type GetImagesResponse = AnImage[];

export type GetGalleriesResponse = AGallery[];
