import type { ANS } from '../types/index.js';
import type { ContentElement } from './content-elements.js';

export type CElement = ANS.AnElementThatCanBeListedAsPartOfContentElements;
export type ContentElementType<T extends keyof typeof ContentElement> = ReturnType<(typeof ContentElement)[T]>;
