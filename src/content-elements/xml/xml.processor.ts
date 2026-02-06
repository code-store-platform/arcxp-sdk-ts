import { type ArcTypes, ContentElements } from '@code.store/arcxp-sdk-ts';
import { parse } from 'node-html-parser';
import * as xmldoc from 'xmldoc';
import type { MaybePromise } from '../../types/utils';
import { decodeHTMLEntities, isTextCE } from '../../utils/arc/content';
import { BLOCK_ELEMENT_TAGS } from './xml.constants';
import { isTextNode, nodeNameIn, nodeNameIs } from './xml.utils.js';

const ContentElement = ContentElements.ContentElement;

export type CElement = ArcTypes.ANS.AnElementThatCanBeListedAsPartOfContentElements;
export type NodeHandler = (node: xmldoc.XmlNodeBase) => MaybePromise<CElement[] | undefined>;
export type WrapHandler = (node: xmldoc.XmlElement, content: string) => string;

export class XMLProcessor {
  protected blockElementTags = BLOCK_ELEMENT_TAGS;

  protected handlers = {
    node: new Map<string, NodeHandler>(),
    wrap: new Map<string, WrapHandler>(),
  };

  init() {
    // wrappers are used to wrap the content of nested text nodes
    // in a specific way
    this.wrap('link', (node, content) => {
      return `<a href="${node.attr.url || node.attr.href || '/'}">${content}</a>`;
    });

    this.wrap('header', (_node, content) => {
      return `<h3>${content}</h3>`;
    });

    this.wrap('emphasize', (_node, content) => {
      return `<i>${content}</i>`;
    });

    this.wrap('strong', (_node, content) => {
      return `<b>${content}</b>`;
    });

    // handlers are used to handle specific nodes
    // and return a list of content elements
    this.handle('default', (node) => {
      if (nodeNameIn(node, ['section', 'paragraph', 'line', 'header', 'emphasize', 'strong', 'link', 'li'])) {
        return this.handleNested(node);
      }
    });

    this.handle('text', (node) => {
      if (isTextNode(node)) {
        return [ContentElement.text(node.text)];
      }
    });

    this.handle('list', async (node) => {
      if (nodeNameIn(node, ['ul', 'ol'])) {
        const listType = node.name === 'ul' ? 'unordered' : 'ordered';
        return this.createList(node, listType);
      }
    });

    this.handle('table', (node) => {
      if (nodeNameIs(node, 'table')) {
        return this.handleTable(node);
      }
    });
  }

  public async parse(xml: string) {
    const doc = new xmldoc.XmlDocument(xml);
    const elements = await this.process(doc);

    return elements || [];
  }

  protected handle(name: string, handler: NodeHandler) {
    if (this.handlers.node.has(name)) {
      throw new Error(`${name} node handler already set`);
    }

    this.handlers.node.set(name, handler);
  }

  protected wrap(name: string, handler: WrapHandler) {
    if (this.handlers.wrap.has(name)) {
      throw new Error(`${name} wrap handler already set`);
    }

    this.handlers.wrap.set(name, handler);
  }

  protected addTextAdditionalProperties(c: ArcTypes.ContentElementType<any>, parent: xmldoc.XmlElement) {
    const additionalProperties = c.additional_properties || {};
    const parentNodeIsBlockElement = this.isBlockElement(parent);
    c.additional_properties = {
      ...c.additional_properties,
      isBlockElement: additionalProperties.isBlockElement || parentNodeIsBlockElement,
    };
    return c;
  }

  protected wrapChildrenTextNodes(node: xmldoc.XmlElement, elements: CElement[]) {
    const wrapped: CElement[] = [];

    for (const c of elements) {
      if (!isTextCE(c)) {
        wrapped.push(c);
        continue;
      }
      this.addTextAdditionalProperties(c, node);

      const handler = this.handlers.wrap.get(node.name);
      if (handler) {
        wrapped.push({
          ...c,
          content: handler(node, c.content),
        });
      } else {
        wrapped.push(c);
      }
    }

    return wrapped;
  }

  protected async handleNested(node: xmldoc.XmlElement) {
    const children = await Promise.all(node.children.map((child) => this.process(child)));
    const filtered = children.filter(Boolean).flat() as CElement[];
    const merged = this.mergeParagraphs(filtered);
    const wrapped = this.wrapChildrenTextNodes(node, merged);

    return wrapped;
  }

  protected async process(node: xmldoc.XmlNodeBase) {
    let isKnownNode = false;
    const elements: CElement[] = [];

    for (const [name, handler] of this.handlers.node.entries()) {
      try {
        const result = await handler(node);

        if (Array.isArray(result)) {
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

    this.warn({ node: node.toString(), type: node.type }, 'UnknownNodeError');
  }

  private mergeParagraphs(items: CElement[]): CElement[] {
    const merged: CElement[] = [];
    let toMerge: ArcTypes.ContentElementType<'text'>[] = [];

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

  protected async handleTable(node: xmldoc.XmlElement) {
    const html = node.toString({ html: true });
    return [ContentElement.raw_html(html)];
  }

  protected async createQuote(node: xmldoc.XmlElement) {
    const items = await this.handleNested(node);

    return [ContentElement.quote(items)];
  }

  protected async createList(node: xmldoc.XmlElement, type: 'ordered' | 'unordered') {
    const items = await this.handleNested(node);

    return [ContentElement.list(type, items)];
  }

  protected getNodeInnerText(node: xmldoc.XmlElement) {
    return node.children.map((n) => this.htmlFromNode(n).innerText.trim());
  }

  protected getNodeInnerHTML(node: xmldoc.XmlElement) {
    return node.children.map((n) => this.htmlFromNode(n).innerHTML.trim());
  }

  protected htmlFromNode(node: xmldoc.XmlNodeBase) {
    return parse(node.toString({ html: true }));
  }

  protected getDecodedHTMLFromInnerNodes(node: xmldoc.XmlElement) {
    const encodedHtml = this.getNodeInnerText(node).join('');
    const decoded = decodeHTMLEntities(encodedHtml);

    return decoded;
  }

  protected isBlockElement(node: xmldoc.XmlElement) {
    const defaultBlockElements = new Set(this.blockElementTags);
    if (defaultBlockElements.has(node.name)) return true;
  }

  protected warn(metadata: Record<string, any>, message: string) {
    console.warn(metadata, message);
  }
}
