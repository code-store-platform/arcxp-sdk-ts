import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { safeJSONStringify } from '../utils/index.js';

export class ArcError extends Error {
  public responseData: unknown;
  public responseStatus?: number;
  public responseConfig?: InternalAxiosRequestConfig<any>;
  public ratelimitRemaining?: string;
  public ratelimitReset?: string;
  public service?: string;

  constructor(service: string, e: AxiosError) {
    const ratelimitRemaining = e.response?.headers['arcpub-ratelimit-remaining'];
    const ratelimitReset = e.response?.headers['arcpub-ratelimit-reset'];
    const data = {
      name: `${service}Error`,
      message: e.message,
      responseData: e.response?.data,
      responseStatus: e.response?.status,
      responseConfig: e.response?.config,
      ratelimitRemaining,
      ratelimitReset,
      service,
    };
    const message = safeJSONStringify(data);

    super(message);

    Object.assign(this, data);
    this.stack = e.stack;
  }
}
