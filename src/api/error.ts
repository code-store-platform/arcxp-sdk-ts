import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { safeJSONStringify } from '../utils';

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
    const message = safeJSONStringify(e.message);

    super(message);

    this.name = `${service}Error`;
    this.responseData = e.response?.data;
    this.responseStatus = e.response?.status;
    this.responseConfig = e.response?.config;
    this.ratelimitRemaining = ratelimitRemaining;
    this.ratelimitReset = ratelimitReset;
    this.service = service;
  }
}
