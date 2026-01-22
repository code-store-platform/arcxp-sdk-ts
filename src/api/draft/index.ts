import type { ANS } from '../../types/index.js';
import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api.js';
import type {
  Circulations,
  CreateDocumentRedirectPayload,
  CreateExternalRedirectPayload,
  CreateRedirectPayload,
  Document,
  DocumentRedirect,
  ExternalRedirect,
  Revision,
  Revisions,
  UpdateDraftRevisionPayload,
} from './types.js';

export class ArcDraft extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'draft/v1' });
  }

  async generateId(id: string) {
    const { data } = await this.client.get<{ id: string }>('/arcuuid', { params: { id } });
    return data.id;
  }

  async createDocument(ans: ANS.AStory, type = 'story') {
    const { data } = await this.client.post<Document>(`/${type}`, ans);
    return data;
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

  async getCirculations(id: string, type = 'story', after?: string) {
    const { data } = await this.client.get<Circulations>(`/${type}/${id}/circulation`, { params: { after } });
    return data;
  }

  async getRevisions(id: string, type = 'story', after?: string) {
    const { data } = await this.client.get<Revisions>(`/${type}/${id}/revision`, { params: { after } });
    return data;
  }

  async getRevision(id: string, revisionId: string, type = 'story') {
    const { data } = await this.client.get<Revision>(`/${type}/${id}/revision/${revisionId}`);
    return data;
  }

  async createRedirect<
    P extends CreateRedirectPayload,
    R = P extends CreateExternalRedirectPayload
      ? ExternalRedirect
      : P extends CreateDocumentRedirectPayload
        ? DocumentRedirect
        : never,
  >(website: string, websiteUrl: string, payload: P) {
    const { data } = await this.client.post<R>(`/redirect/${website}/${websiteUrl}`, payload);
    return data;
  }

  async getRedirect(website: string, websiteUrl: string) {
    const { data } = await this.client.get<ExternalRedirect | DocumentRedirect>(`/redirect/${website}/${websiteUrl}`);
    return data;
  }

  async deleteRedirect(website: string, websiteUrl: string) {
    const { data } = await this.client.delete<ExternalRedirect | DocumentRedirect>(
      `/redirect/${website}/${websiteUrl}`
    );
    return data;
  }

  async updateDraftRevision(id: string, payload: UpdateDraftRevisionPayload, type = 'story') {
    const { data } = await this.client.put<Revision>(`/${type}/${id}/revision/draft`, payload);
    return data;
  }
}
