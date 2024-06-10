import { RepresentationOfANormalizedElement } from '../../types/story';

export const reference = (ref: RepresentationOfANormalizedElement['referent']): RepresentationOfANormalizedElement => {
  return {
    _id: ref.id,
    type: 'reference' as const,
    referent: {
      ...ref,
    },
  };
};
