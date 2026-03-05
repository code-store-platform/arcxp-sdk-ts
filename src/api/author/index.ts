import { ArcAbstractAPI, type ArcAPIOptions } from '../abstract-api.js';
import type {
  AuthorANS,
  AuthorConfigurationResponse,
  CreateAuthorPayload,
  GetAuthorParams,
  ListAuthorsParams,
  ListAuthorsResponse,
  UpdateAuthorPayload,
} from './types.js';

export class ArcAuthor extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'author' });
  }

  async getAuthor(params: GetAuthorParams): Promise<AuthorANS> {
    const { data } = await this.client.get<AuthorANS>('/v1/author-service', { params });
    return data;
  }

  async listAuthors(params?: ListAuthorsParams): Promise<ListAuthorsResponse> {
    const { data } = await this.client.get<ListAuthorsResponse>('/v2/author-service', { params });
    return data;
  }

  async createAuthor(payload: CreateAuthorPayload): Promise<AuthorANS> {
    const { data } = await this.client.post<AuthorANS>('/v2/author-service', payload);
    return data;
  }

  async updateAuthor(id: string, payload: UpdateAuthorPayload): Promise<AuthorANS> {
    const { data } = await this.client.post<AuthorANS>(`/v2/author-service/${id}`, payload);
    return data;
  }

  async deleteAuthor(id: string): Promise<void> {
    await this.client.delete(`/v2/author-service/${id}`);
  }

  async getConfiguration(): Promise<AuthorConfigurationResponse> {
    const { data } = await this.client.get<AuthorConfigurationResponse>('/v1/configuration');
    return data;
  }
}
