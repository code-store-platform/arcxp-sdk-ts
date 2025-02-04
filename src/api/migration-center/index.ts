import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api';
import type {
  Count,
  CountRequest,
  DetailReport,
  DetailReportRequest,
  GetANSParams,
  PostANSParams,
  PostANSPayload,
  Summary,
  SummaryReportRequest,
} from './types';

export class ArcMigrationCenter extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'migrations/v3' });
  }

  async summary(params?: SummaryReportRequest) {
    const { data, headers } = await this.client.get<Summary>('/report/summary', { params });
    const nextFromId: string | undefined = headers['amc-record-id'];

    return { records: data, nextFromId };
  }

  async detailed(params?: DetailReportRequest) {
    const { data } = await this.client.get<DetailReport>('/report/detail', { params });
    return data;
  }

  async count(params?: CountRequest) {
    const { data } = await this.client.get<Count>('/report/status/count', {
      params: {
        startDate: params?.startDate?.toISOString(),
        endDate: params?.endDate?.toISOString(),
      },
    });
    return data;
  }

  async postAns(params: PostANSParams, payload: PostANSPayload) {
    const { data } = await this.client.post('/content/ans', payload, { params });
    return data;
  }

  async getAns(params: GetANSParams) {
    const { data } = await this.client.get('/content/ans', { params });
    return data;
  }
}
