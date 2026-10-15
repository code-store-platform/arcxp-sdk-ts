import { ArcAbstractAPI, type ArcAPIOptions } from '../abstract-api.js';
import type {
  Count,
  CountParams,
  DetailReport,
  DetailReportParams,
  GetANSParams,
  GetRecentGroupIdsResponse,
  GetRemainingTimeParams,
  GetRemainingTimeResponse,
  PostANSParams,
  PostANSPayload,
  Summary,
  SummaryReportParams,
} from './types.js';

export class ArcMigrationCenter extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'migrations/v3' });
  }

  async summary(params?: SummaryReportParams) {
    const { data, headers } = await this.client.get<Summary>('/report/summary', { params });
    const nextFromId: string | undefined = headers['amc-record-id'];

    return { records: data, nextFromId };
  }

  async detailed(params?: DetailReportParams) {
    const { data } = await this.client.get<DetailReport>('/report/detail', { params });
    return data;
  }

  async count(params?: CountParams) {
    const { data } = await this.client.get<Count>('/report/status/count', {
      params: {
        startDate: params?.startDate?.toISOString(),
        endDate: params?.endDate?.toISOString(),
      },
    });
    return data;
  }

  async postAns(params: PostANSParams, payload: PostANSPayload) {
    const { data } = await this.client.post('/content/ans', withVideoDefaults(payload), { params });
    return data;
  }

  async getAns(params: GetANSParams) {
    const { data } = await this.client.get('/content/ans', { params });
    return data;
  }

  async getRemainingTime(params: GetRemainingTimeParams) {
    const { data } = await this.client.get<GetRemainingTimeResponse>('/report/remaining-time', { params });
    return data;
  }

  async getRecentGroupIds() {
    const { data } = await this.client.get<GetRecentGroupIdsResponse>('/report/group-ids');
    return data;
  }
}

/**
 * Video imports default to `transcoding: false`: Arc charges extra for Video Center encoding,
 * so it has to be requested explicitly with `transcoding: true`.
 */
function withVideoDefaults(payload: PostANSPayload): PostANSPayload {
  if (payload.ANS?.type !== 'video') return payload;
  const video = payload.arcAdditionalProperties?.video;
  if (video?.transcoding !== undefined) return payload;
  return {
    ...payload,
    arcAdditionalProperties: {
      ...payload.arcAdditionalProperties,
      video: { ...video, transcoding: false },
    },
  };
}
