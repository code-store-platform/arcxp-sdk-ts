import axios, { type AxiosError } from 'axios';
import rateLimit, { type RateLimitedAxiosInstance } from 'axios-rate-limit';
import axiosRetry from 'axios-retry';
import { AxiosResponseErrorInterceptor } from '../utils';
import { ArcError } from './error';

export type ArcAbstractAPIOptions = {
  credentials: { organizationName: string; accessToken: string };
  apiPath: string;
  maxRPS?: number;
};

export type ArcAPIOptions = Omit<ArcAbstractAPIOptions, 'apiPath'>;

export abstract class ArcAbstractAPI {
  protected name = this.constructor.name;
  protected client: RateLimitedAxiosInstance;

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
    this.client = rateLimit(instance, { maxRPS: options.maxRPS || 10 });

    // apply retry
    axiosRetry(this.client, {
      retries: 5,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (err) => this.retryCondition(err),
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
