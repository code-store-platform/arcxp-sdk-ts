import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {}

export class CustomApi extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: '' });
  }

  async request<T = unknown>(endpoint: `/${string}`, config: AxiosRequestConfig = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.client.request<T>({
      url: endpoint,
      ...config,
    });

    return response.data;
  }
}
