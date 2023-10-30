import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import {
  CreateTaskPayload,
  CreateTaskResponse,
  GetPublicationsResponse,
  ReportStatusChangePayload,
  SectionStoriesPayload,
} from './types';

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

  async getSectionStories(
    publicationId: string,
    sectionId: string,
    timestamp: number,
    includeStories = true
  ): Promise<SectionStoriesPayload> {
    const { data } = await this.client.get(
      `/publications/${publicationId}/sections/${sectionId}/editions/${timestamp}`,
      { params: { includeStories } }
    );
    return data;
  }

  async getPublications(nameRegex: string): Promise<GetPublicationsResponse> {
    const { data } = await this.client.get(`/publications`, { params: { nameRegex } });
    return data;
  }
}
