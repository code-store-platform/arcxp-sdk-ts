import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { SignResponse } from './types';

export class ArcSigningService extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'signing-service' });
  }
  async sign(service: string, serviceVersion: string, imageId: string): Promise<SignResponse> {
    const { data } = await this.client.get(`/v2/sign/${service}/${serviceVersion}?value=${encodeURI(imageId)}`);
    return data;
  }
}
