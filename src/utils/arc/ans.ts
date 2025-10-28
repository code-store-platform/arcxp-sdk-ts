import type { ANS } from '../../types';

export const reference = (
  ref: ANS.RepresentationOfANormalizedElement['referent']
): ANS.RepresentationOfANormalizedElement => {
  return {
    _id: ref.id,
    type: 'reference' as const,
    referent: {
      ...ref,
    },
  };
};
