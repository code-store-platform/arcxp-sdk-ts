import type { ArcTypes } from '..';
import { ArcDocument } from './doc';

export abstract class ArcImage extends ArcDocument<ArcTypes.Story.AnImage> {
  type = 'image' as const;
}
