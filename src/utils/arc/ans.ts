import type { RepresentationOfANormalizedElement } from '../../types/story.js';

export const reference = (ref: RepresentationOfANormalizedElement['referent']): RepresentationOfANormalizedElement => {
  return {
    _id: ref.id,
    type: 'reference' as const,
    referent: {
      ...ref,
    },
  };
};
