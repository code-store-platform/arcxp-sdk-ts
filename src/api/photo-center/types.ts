import { AnImage } from '../../types/story';

export type GetImagesParams = Partial<{
  primaryWebsite: string;
  offset: number;
  limit: number;
}>;

export type GetImagesResponse = AnImage[];
