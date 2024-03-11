import { ArcAPIOptions } from './abstract-api';
import { ArcAuthor } from './author';
import { ArcContent } from './content';
import { ArcDraft } from './draft';
import { ArcIdentity } from './identity';
import { ArcIFX } from './ifx';
import { ArcRedirect } from './redirect';
import { ArcMigrationCenter } from './migration-center';
import { ArcProtoCenter } from './photo-center';
import { ArcSales } from './sales';
import { ArcSigningService } from './signing-service';
import { ArcSite } from './site';
import { ArcWebsked } from './websked';
import { WsClient } from './ws.client';
import { GlobalSettings } from './global-settings';
import { ArcTags } from './tags';

export const ArcAPI = (options: ArcAPIOptions) => {
  const API = {
    Author: new ArcAuthor(options),
    Draft: new ArcDraft(options),
    Identity: new ArcIdentity(options),
    IFX: new ArcIFX(options),
    Redirect: new ArcRedirect(options),
    MigrationCenter: new ArcMigrationCenter(options),
    Sales: new ArcSales(options),
    Site: new ArcSite(options),
    Websked: new ArcWebsked(options),
    Content: new ArcContent(options),
    SigningService: new ArcSigningService(options),
    PhotoCenter: new ArcProtoCenter(options),
    GlobalSettings: new GlobalSettings(options),
    Tags: new ArcTags(options),
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
