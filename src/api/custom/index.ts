import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api';

export interface RequestConfig extends AxiosRequestConfig {}

export class Custom extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: '' });
  }

  public async request<T = unknown>(
    endpoint: `/${string}`,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await this.client.request<T>({
      url: endpoint,
      ...config,
    });

    return response;
  }
}
