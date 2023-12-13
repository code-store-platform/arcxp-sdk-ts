import axios from 'axios';
import { AxiosResponseErrorInterceptor } from '../utils';
import rateLimit, { RateLimitedAxiosInstance } from 'axios-rate-limit';
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
    this.client = rateLimit(
      axios.create({
        baseURL: `https://${this.host}/${options.apiPath}`,
        headers: this.headers,
      }),
      { maxRPS: options.maxRPS || 10 }
    );

    this.client.interceptors.response.use(...AxiosResponseErrorInterceptor((e) => new ArcError(this.name, e)));
  }

  setMaxRPS(rps: number) {
    this.client.setMaxRPS(rps);
  }
}
