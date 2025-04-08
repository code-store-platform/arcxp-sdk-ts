import type { CElement } from '../types/content-elements';
import type { Alignment, AnImage } from '../types/story';

export const ContentElement = {
  divider: () => {
    return {
      type: 'divider' as const,
    };
  },
  text: (content: string, alignment: Alignment | null = 'left') => {
    return {
      type: 'text' as const,
      content,
      alignment: alignment || undefined,
    };
  },
  quote: (items: CElement[], citation = '', subtype: 'blockquote' | 'pullquote' = 'pullquote') => {
    return {
      type: 'quote' as const,
      subtype,
      citation: {
        type: 'text' as const,
        content: citation,
      },
      content_elements: items,
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
      type: 'reference' as const,
      referent: {
        type: 'gallery' as const,
        id,
      },
    };
  },
  list: (type: 'ordered' | 'unordered', items: CElement[]) => {
    return {
      type: 'list' as const,
      list_type: type,
      items,
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
  image: (id: string, properties?: AnImage) => {
    return {
      referent: {
        id,
        type: 'image' as const,
        referent_properties: {
          _id: id,
          type: 'image' as const,
          ...properties,
        },
      },
      type: 'reference' as const,
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
  twitter: (id: string, provider = 'https://publish.twitter.com/oembed?url=') => {
    return {
      referent: {
        id,
        provider,
        service: 'oembed' as const,
        type: 'twitter' as const,
      },
      type: 'reference' as const,
    };
  },
  youtube: (id: string, provider = 'https://www.youtube.com/oembed?url=') => {
    return {
      referent: {
        id,
        provider,
        service: 'oembed',
        type: 'youtube',
      },
      type: 'reference' as const,
    };
  },
  facebook_video: (id: string, provider = 'https://www.facebook.com/plugins/post/oembed.json/?url=') => {
    return {
      referent: {
        id,
        provider,
        service: 'oembed',
        type: 'facebook-video',
      },
      type: 'reference' as const,
    };
  },
  facebook_post: (id: string, provider = 'https://www.facebook.com/plugins/post/oembed.json/?url=') => {
    return {
      referent: {
        id,
        provider,
        service: 'oembed',
        type: 'facebook-post',
      },
      type: 'reference' as const,
    };
  },
  soundcloud: (id: string, provider = 'https://soundcloud.com/oembed.json/?url=') => {
    return {
      referent: {
        id,
        provider,
        service: 'oembed',
        type: 'soundcloud',
      },
      type: 'reference' as const,
    };
  },
  vimeo: (id: string, provider = 'https://vimeo.com/api/oembed.json?url=') => {
    return {
      referent: {
        id,
        provider,
        service: 'oembed',
        type: 'vimeo',
      },
      type: 'reference' as const,
    };
  },
  instagram: (id: string, provider = 'https://api.instagram.com/oembed?url=') => {
    return {
      referent: {
        id,
        provider,
        service: 'oembed',
        type: 'instagram',
      },
      type: 'reference' as const,
    };
  },
  dailymotion: (id: string, provider = 'https://www.dailymotion.com/services/oembed?url=') => {
    return {
      referent: {
        id,
        provider,
        service: 'oembed',
        type: 'dailymotion',
      },
      type: 'reference' as const,
    };
  },
  tiktok: (id: string, provider = 'https://www.tiktok.com/oembed?url=') => {
    return {
      referent: {
        id,
        provider,
        service: 'oembed',
        type: 'tiktok',
      },
      type: 'reference' as const,
    };
  },
  issuu: (id: string, provider = 'https://issuu.com/oembed_wp?url=') => {
    return {
      referent: {
        id,
        provider,
        service: 'oembed',
        type: 'issuu',
      },
      type: 'reference' as const,
    };
  },
  kickstarter: (id: string, provider = 'https://www.kickstarter.com/services/oembed?url=') => {
    return {
      referent: {
        id,
        provider,
        service: 'oembed',
        type: 'kickstarter',
      },
      type: 'reference' as const,
    };
  },
  polldaddy: (id: string, provider = 'https://polldaddy.com/oembed/?url=') => {
    return {
      referent: {
        id,
        provider,
        service: 'oembed',
        type: 'polldaddy',
      },
      type: 'reference' as const,
    };
  },
};
