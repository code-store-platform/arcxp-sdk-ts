import { Alignment, AnImage } from '../types/story';

export type ContentElementType<T extends keyof typeof ContentElement> = ReturnType<(typeof ContentElement)[T]>;

const refType = 'reference' as const;

export const ContentElement = {
  divider: () => {
    return {
      type: 'divider' as const,
    };
  },
  text: (content: string, alignment: Alignment = 'left') => {
    return {
      type: 'text' as const,
      content,
      alignment,
    };
  },
  quote: (content: string) => {
    return {
      type: 'quote' as const,
      subtype: 'pullquote' as const,
      citation: {
        type: 'text' as const,
        content: '',
      },
      content_elements: [
        {
          content,
          type: 'text' as const,
        },
      ],
    };
  },
  interstitial_link: (url: string, content: string) => {
    return {
      type: 'interstitial_link' as const,
      url,
      content,
    };
  },
  header: (content: string, level: number) => {
    return {
      type: 'header' as const,
      content,
      level,
    };
  },
  raw_html: (content: string) => {
    return {
      type: 'raw_html' as const,
      content,
    };
  },
  gallery: (id: string) => {
    return {
      type: refType,
      referent: {
        type: 'gallery' as const,
        id,
      },
    };
  },
  list: (type: 'ordered' | 'unordered', items: string[]) => {
    return {
      type: 'list' as const,
      list_type: type,
      items: items.map((content) => {
        return {
          type: 'text' as const,
          content,
        };
      }),
    };
  },
  link_list: (title: string, links: { content: string; url: string }[]) => {
    return {
      type: 'link_list' as const,
      title,
      items: links.map(({ content, url }) => {
        return {
          type: 'interstitial_link' as const,
          content,
          url,
        };
      }),
    };
  },
  image: (id: string, properties: AnImage) => {
    return {
      referent: {
        id,
        type: 'image' as const,
        referent_properties: {
          ...properties,
        },
      },
      type: refType,
    };
  },
  jwPlayer: (id: string) => {
    return {
      embed: {
        config: {},
        id,
        url: 'https://cdn.jwplayer.com/players',
      },
      subtype: 'jw_player' as const,
      type: 'custom_embed' as const,
    };
  },
};
