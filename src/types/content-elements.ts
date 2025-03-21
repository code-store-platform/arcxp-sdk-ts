import type { ContentElement } from '../content-elements/content-elements';
import type { AnElementThatCanBeListedAsPartOfContentElements } from '../types/story';

export type CElement = AnElementThatCanBeListedAsPartOfContentElements;
export type ContentElementType<T extends keyof typeof ContentElement> = ReturnType<(typeof ContentElement)[T]>;
