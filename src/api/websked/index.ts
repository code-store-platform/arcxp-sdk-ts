import { ArcAbstractAPI, type ArcAPIOptions } from '../abstract-api.js';
import type {
  CreateTaskPayload,
  CreateTaskResponse,
  GetEditionTimesResponse,
  GetPublicationsResponse,
  GetStatusesResponse,
  ReportStatusChangePayload,
  SectionEdition,
  WebskedPublication,
} from './types.js';

export class ArcWebsked extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'websked' });
  }

  async reportStatusChange(payload: ReportStatusChangePayload): Promise<void> {
    const { data } = await this.client.post<void>('/tasks/workflowStatusChange', payload);
    return data;
  }

  async createTask(payload: CreateTaskPayload): Promise<CreateTaskResponse> {
    const { data } = await this.client.post('/tasks', payload);
    return data;
  }

  async getEditionTimes(
    publicationId: string,
    startDate: number,
    endDate: number,
    numEditions = 1
  ): Promise<GetEditionTimesResponse> {
    const { data } = await this.client.get(`/publications/${publicationId}/editionTimes`, {
      params: { startDate, endDate, numEditions },
    });
    return data;
  }

  async getSectionStories(
    publicationId: string,
    sectionId: string,
    timestamp: number,
    includeStories = true
  ): Promise<SectionEdition> {
    const { data } = await this.client.get(
      `/publications/${publicationId}/sections/${sectionId}/editions/${timestamp}`,
      { params: { includeStories } }
    );
    return data;
  }

  async getSectionEditions(
    publicationId: string,
    sectionId: string,
    startDate: number,
    numEditions = 100
  ): Promise<SectionEdition[]> {
    const { data } = await this.client.get(`/publications/${publicationId}/sections/${sectionId}/editions`, {
      params: { startDate, numEditions },
    });
    return data;
  }

  async getPublications(nameRegex: string): Promise<GetPublicationsResponse> {
    const { data } = await this.client.get('/publications', { params: { nameRegex } });
    return data;
  }

  async getPublicationById(publicationId: string): Promise<WebskedPublication> {
    const { data } = await this.client.get(`/publications/${publicationId}`);
    return data;
  }

  async getStatuses(): Promise<GetStatusesResponse> {
    const { data } = await this.client.get('/statuses');
    return data;
  }
}
