import { ArcAbstractAPI, type ArcAPIOptions } from '../abstract-api';
import type {
  CreateDocumentRedirectPayload,
  CreateExternalRedirectPayload,
  CreateRedirectPayload,
  DocumentRedirect,
  ExternalRedirect,
  Revision,
  Document,
  UpdateDraftRevisionPayload,
} from './types';

export class ArcDraft extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'draft/v1' });
  }

  async generateId(id: string) {
    const { data } = await this.client.get<{ id: string }>('/arcuuid', { params: { id } });
    return data.id;
  }

  async publishDocument(id: string, type = 'story') {
    const { data } = await this.client.post<Revision>(`/${type}/${id}/revision/published`);
    return data;
  }

  async unpublishDocument(id: string, type = 'story') {
    const { data } = await this.client.delete<Revision>(`/${type}/${id}/revision/published`);
    return data;
  }

  async deleteDocument(id: string, type = 'story') {
    const { data } = await this.client.delete<Document>(`/${type}/${id}`);
    return data;
  }

  async getPublishedRevision(id: string, type = 'story') {
    const { data } = await this.client.get<Revision>(`/${type}/${id}/revision/published`);
    return data;
  }

  async getDraftRevision(id: string, type = 'story') {
    const { data } = await this.client.get<Revision>(`/${type}/${id}/revision/draft`);
    return data;
  }

  async createRedirect<
    P extends CreateRedirectPayload,
    R = P extends CreateExternalRedirectPayload
      ? ExternalRedirect
      : P extends CreateDocumentRedirectPayload
      ? DocumentRedirect
      : never
  >(website: string, websiteUrl: string, payload: P) {
    const { data } = await this.client.post<R>(`/redirect/${website}/${websiteUrl}`, payload);
    return data;
  }

  async getRedirect(website: string, websiteUrl: string) {
    const { data } = await this.client.get<ExternalRedirect | DocumentRedirect>(`/redirect/${website}/${websiteUrl}`);
    return data;
  }

  async updateDraftRevision(id: string, payload: UpdateDraftRevisionPayload, type = 'story') {
    const { data } = await this.client.put<Revision>(`/${type}/${id}/revision/draft`, payload);
    return data;
  }
}
