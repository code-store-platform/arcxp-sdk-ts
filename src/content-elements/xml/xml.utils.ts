import type * as xmldoc from 'xmldoc';

export const isXmlElement = (node?: xmldoc.XmlNodeBase): node is xmldoc.XmlElement => {
  return node?.type === 'element';
};

export const isTextNode = (node: xmldoc.XmlNodeBase): node is xmldoc.XmlTextNode => {
  return node?.type === 'text';
};

export const nodeNameIs = (node: xmldoc.XmlNodeBase, name: string): node is xmldoc.XmlElement => {
  return isXmlElement(node) && node.name === name;
};

export const nodeNameIn = (node: xmldoc.XmlNodeBase, names: string[]): node is xmldoc.XmlElement => {
  return isXmlElement(node) && names.includes(node.name);
};
