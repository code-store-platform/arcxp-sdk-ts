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
