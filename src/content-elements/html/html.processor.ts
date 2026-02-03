import { type CommentNode, type HTMLElement, type Node, parse } from 'node-html-parser';
import type { MaybePromise } from '../../types/utils.js';
import { isTextCE } from '../../utils/arc/content.js';
import { ContentElement } from '../content-elements.js';
import type { CElement, ContentElementType } from '../types.js';
import { BLOCK_ELEMENT_TAGS } from './html.constants.js';
import {
  getHTMLElementAttribute,
  isCommentNode,
  isHTMLElement,
  isTextNode,
  nodeTagIn,
  nodeTagIs,
} from './html.utils.js';

export type NodeHandler = (node: Node) => MaybePromise<CElement[] | undefined>;
export type WrapHandler = (node: Node, content: ContentElementType<'text'>) => ContentElementType<'text'> | undefined;

/**
 * HTMLProcessor is responsible for parsing HTML content into structured content elements.
 * It provides a flexible way to handle different HTML nodes and wrap text content.
 *
 * The processor can be extended with custom handlers for specific node types and
 * wrappers for text content.
 *
 * @example
 * ```ts
 * // Create and initialize processor
 * const processor = new HTMLProcessor();
 * processor.init();
 *
 * // Parse HTML content
 * const html = '<div><p>Some text</p><img src="image.jpg"></div>';
 * const elements = await processor.parse(html);
 * ```
 *
 * The processor comes with built-in handlers for common HTML elements like links,
 * text formatting (i, u, strong), and block elements. Custom handlers can be added
 * using the `handle()` and `wrap()` methods.
 */
export class HTMLProcessor {
  protected parallelProcessing = true;

  protected handlers = {
    node: new Map<string, NodeHandler>(),
    wrap: new Map<string, WrapHandler>(),
  };

  init() {
    // wrappers are used to wrap the content of nested text nodes
    // in a specific way
    this.wrap('link', (node, text) => {
      if (nodeTagIn(node, ['a'])) {
        const attributes = ['href', 'target', 'rel']
          .map((attr) => [attr, getHTMLElementAttribute(node, attr)])
          .filter(([_, value]) => value)
          .map(([key, value]) => `${key}="${value}"`)
          .join(' ');

        return {
          ...text,
          content: `<a ${attributes}>${text.content}</a>`,
        };
      }
    });

    this.wrap('i', (node, text) => {
      if (nodeTagIn(node, ['i'])) {
        return {
          ...text,
          content: `<i>${text.content}</i>`,
        };
      }
    });

    this.wrap('u', (node, text) => {
      if (nodeTagIn(node, ['u'])) {
        return {
          ...text,
          content: `<u>${text.content}</u>`,
        };
      }
    });

    this.wrap('sup/sub', (node, text) => {
      if (nodeTagIn(node, ['sup', 'sub'])) {
        return {
          ...text,
          content: `<mark class="${node.tagName.toLowerCase()}">${text.content}</mark>`,
        };
      }
    });

    this.wrap('strong', (node, text) => {
      if (nodeTagIn(node, ['strong', 'b'])) {
        return {
          ...text,
          content: `<b>${text.content}</b>`,
        };
      }
    });

    this.wrap('center', (node, text) => {
      if (nodeTagIn(node, ['center'])) {
        return {
          ...text,
          alignment: 'center',
        };
      }
    });

    this.wrap('aligned-paragraph', (node, text) => {
      if (nodeTagIn(node, ['p'])) {
        const styleAttribute = getHTMLElementAttribute(node, 'style') || '';
        if (!styleAttribute) return text;

        if (styleAttribute.includes('text-align: right;')) {
          return {
            ...text,
            alignment: 'right',
          };
        }
        if (styleAttribute.includes('text-align: left;')) {
          return {
            ...text,
            alignment: 'left',
          };
        }
        if (styleAttribute.includes('text-align: center;')) {
          return {
            ...text,
            alignment: 'center',
          };
        }

        return text;
      }
    });

    // handlers are used to handle specific nodes
    // and return a list of content elements
    this.handle('default', (node) => {
      const noTag = isHTMLElement(node) && !node.tagName;
      if (
        noTag ||
        nodeTagIn(node, [
          'p',
          'a',
          'b',
          'sup',
          'sub',
          'span',
          'strong',
          'em',
          'i',
          'u',
          'section',
          'main',
          'div',
          'li',
          'center',
        ])
      ) {
        return this.handleNested(node);
      }
    });

    this.handle('headers', (node) => {
      if (nodeTagIn(node, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])) {
        return this.createHeader(node);
      }
    });

    this.handle('text', (node) => {
      if (isTextNode(node)) {
        return this.createText(node);
      }
    });

    this.handle('comment', (node) => {
      if (isCommentNode(node)) {
        return this.handleComment(node);
      }
    });

    this.handle('list', async (node) => {
      if (nodeTagIn(node, ['ul', 'ol'])) {
        const listType = node.tagName === 'UL' ? 'unordered' : 'ordered';
        return this.createList(node, listType);
      }
    });

    this.handle('table', (node) => {
      if (nodeTagIs(node, 'table')) {
        return this.handleTable(node);
      }
    });

    this.handle('iframe', (node) => {
      if (nodeTagIs(node, 'iframe')) {
        return this.handleIframe(node);
      }
    });

    this.handle('img', (node) => {
      if (nodeTagIs(node, 'img')) {
        return this.handleImage(node);
      }
    });

    this.handle('br', (node) => {
      if (nodeTagIs(node, 'br')) {
        return this.handleBreak(node);
      }
    });
  }

  protected handle(name: string, handler: NodeHandler) {
    if (this.handlers.node.has(name)) {
      this.warn({ name }, `${name} node handler already set`);
    }

    this.handlers.node.set(name, handler);
  }

  protected wrap(name: string, handler: WrapHandler) {
    if (this.handlers.wrap.has(name)) {
      this.warn({ name }, `${name} wrap handler already set`);
    }

    this.handlers.wrap.set(name, handler);
  }

  public async parse(html: string) {
    const doc = parse(html, { comment: true });
    doc.removeWhitespace();
    const elements = await this.process(doc);
    const filtered = elements?.filter((e) => e.type !== 'divider');

    return filtered || [];
  }

  protected addTextAdditionalProperties(c: ContentElementType<any>, parent: Node) {
    const additionalProperties = c.additional_properties || {};
    const parentNodeIsBlockElement = this.isBlockElement(parent);
    c.additional_properties = {
      ...c.additional_properties,
      isBlockElement: additionalProperties.isBlockElement || parentNodeIsBlockElement,
    };
    return c;
  }

  /**
   * Wraps text content elements with additional properties and handlers.
   * This method iterates through an array of content elements and applies
   * wrappers to text elements.
   *
   * @param node - The HTML node containing the text elements
   **/
  protected wrapChildrenTextNodes(node: Node, elements: CElement[]) {
    const wrapped: CElement[] = [];
    const wrappers = [...this.handlers.wrap.values()];

    for (const c of elements) {
      if (!isTextCE(c)) {
        wrapped.push(c);
        continue;
      }
      this.addTextAdditionalProperties(c, node);

      const handled = wrappers.map((wrapper) => wrapper(node, c)).find(Boolean);
      wrapped.push(handled || c);
    }

    return wrapped;
  }

  /**
   * Handles nested nodes by processing their children and merging text elements.
   * This method recursively processes the children of a given HTML node and
   * returns a list of content elements.
   *
   * @param node - The HTML node to process
   **/
  protected async handleNested(node: Node) {
    const children = await this.processChildNodes(node);
    const filtered = children.filter(Boolean).flat() as CElement[];
    const merged = this.mergeParagraphs(filtered);
    const wrapped = this.wrapChildrenTextNodes(node, merged);

    return wrapped;
  }

  protected async processChildNodes(node: Node): Promise<(CElement[] | undefined)[]> {
    if (this.parallelProcessing) {
      return await Promise.all(node.childNodes.map((child) => this.process(child)));
    }

    const children: (CElement[] | undefined)[] = [];
    for (const child of node.childNodes) {
      children.push(await this.process(child));
    }
    return children;
  }

  /**
   * Processes a single HTML node and converts it into content elements.
   * This method iterates through registered node handlers and attempts to process the node.
   * If a handler successfully processes the node, it returns an array of content elements.
   *
   * @param node - The HTML node to process
   * @returns Promise resolving to an array of content elements, or undefined if node cannot be processed
   */
  protected async process(node: Node) {
    let isKnownNode = false;
    const elements: CElement[] = [];

    for (const [name, handler] of this.handlers.node.entries()) {
      try {
        const result = await handler(node);

        if (result) {
          // if handler returns an array of elements, it means that the node was handled properly, even if there is no elements inside
          isKnownNode = true;
          elements.push(...result);
          break;
        }
      } catch (error: any) {
        this.warn({ node: node.toString(), error: error.toString(), name }, 'HandlerError');
      }
    }
    if (isKnownNode) return elements;
    this.warn({ node: node.toString() }, 'UnknownNodeError');
  }

  /**
   * Merges adjacent text content elements into a single paragraph.
   * This method iterates through an array of content elements and combines
   * adjacent text elements into a single paragraph.
   *
   * @param items - The array of content elements to merge
   **/
  protected mergeParagraphs(items: CElement[]): CElement[] {
    const merged: CElement[] = [];
    let toMerge: ContentElementType<'text'>[] = [];

    const merge = (): void => {
      if (!toMerge.length) return;

      const paragraph = toMerge.reduce(
        (acc, p) => {
          return {
            ...p,
            content: acc.content + p.content,
          };
        },
        { type: 'text', content: '' }
      );

      merged.push(paragraph);
      toMerge = [];
    };

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const isBlockElement = item.additional_properties?.isBlockElement;
      if (isTextCE(item) && !isBlockElement) {
        toMerge.push(item);
      } else {
        merge();
        merged.push(item);
      }
    }

    merge();

    return merged;
  }

  protected handleComment(_: CommentNode): MaybePromise<CElement[]> {
    return [];
  }

  protected async handleTable(node: Node) {
    return [ContentElement.raw_html(node.toString())];
  }

  protected async handleIframe(node: Node) {
    return [ContentElement.raw_html(node.toString())];
  }

  protected async handleImage(node: Node) {
    return [ContentElement.raw_html(node.toString())];
  }

  protected async handleBreak(_: Node) {
    return [ContentElement.divider()];
  }

  protected async createQuote(node: Node) {
    const items = await this.handleNested(node);

    return [ContentElement.quote(items)];
  }

  protected async createText(node: Node): Promise<CElement[]> {
    const text = ContentElement.text(node.text);
    return [text];
  }

  protected filterListItems(items: ContentElementType<any>[]) {
    return items.filter((i) => ['text', 'list'].includes(i.type));
  }

  protected async createList(node: Node, type: 'ordered' | 'unordered'): Promise<ContentElementType<any>[]> {
    const items = await this.handleNested(node);
    return [ContentElement.list(type, this.filterListItems(items))];
  }

  protected async createHeader(node: HTMLElement) {
    const level = +node.tagName.split('H')[1] || 3;

    return [ContentElement.header(node.innerText, level)];
  }

  protected isBlockElement(node: Node) {
    if (!isHTMLElement(node)) return false;

    const defaultBlockElements = new Set(BLOCK_ELEMENT_TAGS);
    return defaultBlockElements.has(node.tagName);
  }

  protected warn(metadata: Record<string, any>, message: string) {
    console.warn(metadata, message);
  }
}
