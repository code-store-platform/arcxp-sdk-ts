import type { AnElementThatCanBeListedAsPartOfContentElements } from '../types/story.js';
import type { ContentElement } from './content-elements.js';

export type CElement = AnElementThatCanBeListedAsPartOfContentElements;
export type ContentElementType<T extends keyof typeof ContentElement> = ReturnType<(typeof ContentElement)[T]>;
