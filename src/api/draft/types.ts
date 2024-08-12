import type { AStory } from '../../types/story';

export type CreateExternalRedirectPayload = {
  redirect_to: string;
  document_id?: undefined;
};

export type CreateDocumentRedirectPayload = {
  document_id: string;
  redirect_to?: undefined;
};

export type CreateRedirectPayload = CreateDocumentRedirectPayload | CreateExternalRedirectPayload;

type BaseRedirectData = {
  website_id: string;
  website_url: string;
  created_at: string;
  updated_at: string;
};

export type DocumentRedirect = {
  document_id: string;
} & BaseRedirectData;

export type ExternalRedirect = {
  redirect_to: string;
} & BaseRedirectData;

export type Revision = {
  id: string;
  document_id: string;
  created_at: string;
  type: string;
  user_id?: string;
  ans: AStory;
};

export type Document = {
  id: string;
  type: 'STORY';
  created_at: string;
  draft_revision_id: string;
  published_revision_id?: string;
  first_published_at?: string;
  last_published_at?: string;
  first_unpublished_at?: string;
  last_unpublished_at?: string;
};

export type UpdateDraftRevisionPayload = {
  document_id: string;
  ans: AStory;
  type: 'DRAFT';
};
