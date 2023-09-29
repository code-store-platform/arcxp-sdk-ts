import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import {
  CreateDocumentRedirectPayload,
  CreateExternalRedirectPayload,
  CreateRedirectPayload,
  DocumentRedirect,
  ExternalRedirect,
} from './types';

export class ArcDraft extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'draft/v1' });
  }

  async generateId(id: string) {
    const { data } = await this.client.get<{ id: string }>('/arcuuid', { params: { id } });
    return data.id;
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
}
