import type { ANS } from '../../types/index.js';

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

export type GetImagesResponse = ANS.AnImage[];

export type GetGalleriesResponse = ANS.AGallery[];
