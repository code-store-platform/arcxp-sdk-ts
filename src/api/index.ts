import { ArcAPIOptions } from './abstract-api';
import { ArcAuthor } from './author';
import { ArcDraft } from './draft';
import { ArcIdentity } from './identity';
import { ArcIFX } from './ifx';
import { ArcMigrationCenter } from './migration-center';
import { ArcSales } from './sales';
import { ArcSite } from './site';
import { ArcWebsked } from './websked';
import WsClient from './ws.client';

export const ArcAPI = (options: ArcAPIOptions) => {
  const API = {
    Author: new ArcAuthor(options),
    Draft: new ArcDraft(options),
    Identity: new ArcIdentity(options),
    IFX: new ArcIFX(options),
    MigrationCenter: new ArcMigrationCenter(options),
    Sales: new ArcSales(options),
    Site: new ArcSite(options),
    Websked: new ArcWebsked(options),
  };

  return {
    ...API,
    setMaxRPS: (rps: number) => {
      Object.values(API).forEach((a) => a.setMaxRPS(rps));
    },
    RetailEvents: (index: '0' | '1' | 'string' = '0') => {
      const address = `wss://api.${options.credentials.organizationName}.arcpublishing.com/retail/api/v1/event/stream/${index}`;
      const headers = {
        Authorization: `Bearer ${options.credentials.accessToken}`,
      };
      return new WsClient(address, { headers });
    },
  };
};
