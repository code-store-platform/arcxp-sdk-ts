import {
  PostANSParams,
  PostANSPayload,
  GetANSParams,
  Summary,
  Count,
  DetailReportRequest,
  SummaryReportRequest,
  DetailReport,
  CountRequest,
} from './types';
import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { stringify } from 'querystring';

export class ArcMigrationCenter extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'migrations/v3' });
  }

  async summary(params?: SummaryReportRequest) {
    const { data } = await this.client.get<Summary>(`/report/summary?${stringify(params)}`);
    return data;
  }

  async detailed(params?: DetailReportRequest) {
    const { data } = await this.client.get<DetailReport>(`/report/detail?${stringify(params)}`);
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
    const search = stringify(params);

    const { data } = await this.client.post(`/content/ans?${search}`, payload);
    return data;
  }

  async getAns(params: GetANSParams) {
    const search = stringify(params);

    const { data } = await this.client.get(`/content/ans?${search}`);
    return data;
  }
}
