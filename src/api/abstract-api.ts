import axios, { type AxiosError } from 'axios';
import * as rateLimit from 'axios-rate-limit';
import axiosRetry from 'axios-retry';
import { AxiosResponseErrorInterceptor } from '../utils/index.js';
import { ArcError } from './error.js';

export type ArcAbstractAPIOptions = {
  credentials: { organizationName: string; accessToken: string };
  apiPath: string;
  maxRPS?: number;
  maxRetries?: number;
};

export type ArcAPIOptions = Omit<ArcAbstractAPIOptions, 'apiPath'>;

export abstract class ArcAbstractAPI {
  protected name = this.constructor.name;
  protected client: rateLimit.RateLimitedAxiosInstance;

  private token = '';
  private host = '';
  private headers = {
    Authorization: '',
  };

  constructor(options: ArcAbstractAPIOptions) {
    this.host = `api.${options.credentials.organizationName}.arcpublishing.com`;
    this.token = `Bearer ${options.credentials.accessToken}`;
    this.headers.Authorization = this.token;

    const instance = axios.create({
      baseURL: `https://${this.host}/${options.apiPath}`,
      headers: this.headers,
    });

    // apply rate limiting
    this.client = (rateLimit as any).default(instance, { maxRPS: options.maxRPS || 10 });

    // apply retry
    const retry = typeof axiosRetry === 'function' ? axiosRetry : (axiosRetry as any).default;
    retry(this.client, {
      retries: options.maxRetries || 10,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (err: AxiosError) => this.retryCondition(err),
    });

    // wrap response errors
    this.client.interceptors.response.use(
      ...AxiosResponseErrorInterceptor((e) => {
        if (e instanceof ArcError) return e;
        return new ArcError(this.name, e);
      })
    );
  }

  setMaxRPS(rps: number) {
    this.client.setMaxRPS(rps);
  }

  retryCondition(error: AxiosError) {
    const status = error.response?.status;

    switch (status) {
      case axios.HttpStatusCode.RequestTimeout:
      case axios.HttpStatusCode.TooManyRequests:
      case axios.HttpStatusCode.InternalServerError:
      case axios.HttpStatusCode.BadGateway:
      case axios.HttpStatusCode.ServiceUnavailable:
      case axios.HttpStatusCode.GatewayTimeout:
        return true;
      default:
        return false;
    }
  }
}
