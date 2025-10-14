import type { ArcAPIOptions } from '../abstract-api.js';
import { WsClient } from '../ws.client.js';

export class ArcRetailEvents {
  constructor(private readonly options: Pick<ArcAPIOptions, 'credentials'>) {}

  createWsClient(index: '0' | '1' | string = '0') {
    const address = `wss://api.${this.options.credentials.organizationName}.arcpublishing.com/retail/api/v1/event/stream/${index}`;
    const headers = {
      Authorization: `Bearer ${this.options.credentials.accessToken}`,
    };

    return new WsClient(address, { headers });
  }
}
