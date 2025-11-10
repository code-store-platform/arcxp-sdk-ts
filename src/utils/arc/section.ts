import assert from 'node:assert';
import type { ArcAPIType } from '../../api';
import type { Section, SectionReference, SetSectionPayload } from '../../types';
import { reference } from './ans';

export type NavigationTreeNode<T = unknown> = {
  id: string;
  children: NavigationTreeNode<T>[];
  parent: NavigationTreeNode<T> | null;
  meta: T;
};

export type NavigationItem = {
  id: string;
  [key: `N${number}`]: string;
};

export const buildTree = <T = any>(items: NavigationItem[]) => {
  const tree: NavigationTreeNode<T>[] = [
    {
      id: '/',
      children: [],
      meta: new Proxy(
        {},
        {
          get: () => {
            throw new Error('Root node meta is not accessible');
          },
        }
      ),
      parent: null,
    } as any,
  ];

  // Track nodes at each level to maintain parent-child relationships
  // stores last node at each level
  const currLevelNodes: Record<number, NavigationTreeNode<T>> = {
    0: tree[0],
  };

  for (const item of items) {
    const node: NavigationTreeNode<T> = {
      id: item.id,
      parent: null,
      children: [],
      meta: item as any,
    };

    // Determine the level of this node
    const levelKey = Object.keys(item).find((key) => key.startsWith('N') && item[key as keyof NavigationItem]);
    const level = Number(levelKey?.replace('N', '')) || 0;
    if (!level) {
      throw new Error(`Invalid level for section ${item.id}`);
    }

    // This is a child node - attach to its parent
    const parentLevel = level - 1;
    const parentNode = currLevelNodes[parentLevel];

    if (parentNode) {
      node.parent = parentNode;
      parentNode.children.push(node);
    } else {
      throw new Error(`Parent node not found for section ${item.id}`);
    }

    // Set this as the current node for its level
    currLevelNodes[level] = node;
  }

  // return root nodes children
  return tree[0].children;
};

export const flattenTree = <T = any>(tree: NavigationTreeNode<T>[]): NavigationTreeNode<T>[] => {
  const flatten: NavigationTreeNode<T>[] = [];

  const traverse = (node: NavigationTreeNode<T>) => {
    flatten.push(node);
    for (const child of node.children) {
      traverse(child);
    }
  };

  // traverse all root nodes and their children
  for (const node of tree) {
    traverse(node);
  }

  return flatten;
};

export const buildAndFlattenTree = <T>(items: NavigationItem[]) => flattenTree<T>(buildTree(items));

export const groupByWebsites = (sections: Section[]) => {
  return sections.reduce(
    (acc, section) => {
      const website = section._website!;
      if (!acc[website]) acc[website] = [];
      acc[website].push(section);
      return acc;
    },
    {} as Record<string, Section[]>
  );
};

export const references = (sections: Section[]) => {
  return sections.map(
    (s) =>
      reference({
        id: s._id,
        website: s._website,
        type: 'section',
      }) as SectionReference
  );
};

export const isReference = (section: any): section is SectionReference => {
  return section?.type === 'reference' && section?.referent?.type === 'section';
};

export const removeDuplicates = <T extends Section | SectionReference>(sections: T[]): T[] => {
  const map = new Map();

  sections.forEach((s) => {
    if (isReference(s)) {
      map.set(`${s.referent.id}${s.referent.website}`, s);
    } else {
      map.set(`${s._id}${s._website}`, s);
    }
  });

  return [...map.values()];
};

export class SectionsRepository {
  public sectionsByWebsite: Record<string, Section[]> = {};
  public websitesAreLoaded = false;

  constructor(protected arc: ArcAPIType) {}

  async put(ans: SetSectionPayload) {
    await this.arc.Site.putSection(ans);
    const created = await this.arc.Site.getSection(ans._id, ans.website);
    this.save(created);
  }

  async loadWebsite(website: string) {
    const sections: Section[] = [];
    let next = true;
    let offset = 0;

    while (next) {
      const migrated = await this.arc.Site.getSections({ website, offset }).catch((_) => {
        return { q_results: [] };
      });
      if (migrated.q_results.length) {
        sections.push(...migrated.q_results);
        offset += migrated.q_results.length;
      } else {
        next = false;
      }
    }

    return sections;
  }

  async loadWebsites(websites: string[]) {
    for (const website of websites) {
      this.sectionsByWebsite[website] = await this.loadWebsite(website);
    }

    this.websitesAreLoaded = true;
  }

  save(section: Section) {
    const website = section._website;

    assert.ok(website, 'Section must have a website');

    this.sectionsByWebsite[website] = this.sectionsByWebsite[website] || [];

    if (!this.sectionsByWebsite[website].find((s) => s._id === section._id)) {
      this.sectionsByWebsite[website].push(section);
    }
  }

  getById(id: string, website: string) {
    this.ensureWebsitesLoaded();

    const section = this.sectionsByWebsite[website]?.find((s) => s._id === id);
    return section;
  }

  getByWebsite(website: string) {
    this.ensureWebsitesLoaded();

    return this.sectionsByWebsite[website];
  }

  getParentSections(section: Section) {
    this.ensureWebsitesLoaded();

    const parents: Section[] = [];
    let current = section;

    while (current.parent?.default && current.parent.default !== '/') {
      const parent = this.getById(current.parent.default, section._website!);
      if (!parent) break;

      parents.push(parent);
      current = parent;
    }

    return parents;
  }

  protected ensureWebsitesLoaded() {
    assert.ok(this.websitesAreLoaded, 'call .loadWebsites() first');
  }
}
