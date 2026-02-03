import { CommentNode, HTMLElement, type Node, type Options, parse, TextNode } from 'node-html-parser';
import { decodeHTMLEntities } from '../../utils/arc/content';

export const isTextNode = (node?: Node): node is TextNode => {
  return node instanceof TextNode;
};

export const isHTMLElement = (node?: Node): node is HTMLElement => {
  return node instanceof HTMLElement;
};

export const isCommentNode = (node?: Node): node is CommentNode => {
  return node instanceof CommentNode;
};

export const nodeTagIs = (node: Node, name: string): node is HTMLElement => {
  return isHTMLElement(node) && node.tagName?.toLowerCase() === name.toLowerCase();
};

export const nodeTagIn = (node: Node, names: string[]): node is HTMLElement => {
  return isHTMLElement(node) && names.includes(node.tagName?.toLowerCase());
};

export const htmlToText = (html?: string | null, parseOptions?: Partial<Options>) => {
  if (!html) return '';
  const doc = parse(html, parseOptions);
  return decodeHTMLEntities(doc.innerText);
};

export const getHTMLElementAttribute = (e: HTMLElement, key: string) => {
  const value = e.getAttribute(key);
  if (value) return value;

  return new URLSearchParams(e.rawAttrs.replaceAll(' ', '&')).get(key);
};
