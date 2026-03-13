export type ImportVideoParams = {
  encode: boolean;
  isLive: boolean;
  useLastUpdated: boolean;
};

export type ImportVideoPayload = {
  id?: string;
  type?: 'AUTHOR' | 'CLARIFICATION' | 'CORRECTION' | 'IMAGE' | 'REDIRECT' | 'REFERENCE' | 'SECTION' | 'SITE' | 'STORY' | 'VIDEO';
  version?: '_0_5_7' | '_0_5_8' | '_0_5_9' | '_0_6_0' | '_0_6_2' | '_0_8_0';
  canonicalWebsite?: string;
  embedHtml?: string;
  promoImage?: Record<string, unknown>;
  promoItems?: { basic?: Record<string, unknown> };
  streams?: Record<string, unknown>[];
  websites?: Record<string, unknown>;
};

export type DeleteVideoParams = {
  uuid: string;
  hardDelete?: boolean;
};

export type UpdateVideoUrlParams = {
  uuid: string;
};
