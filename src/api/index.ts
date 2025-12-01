import type { ArcAPIOptions } from './abstract-api.js';
import { ArcAuthor } from './author/index.js';
import { ArcContentOps } from './content-ops/index.js';
import { ArcContent } from './content/index.js';
import { Custom } from './custom/index.js';
import { ArcDraft } from './draft/index.js';
import { GlobalSettings } from './global-settings/index.js';
import { ArcIdentity } from './identity/index.js';
import { ArcIFX } from './ifx/index.js';
import { ArcMigrationCenter } from './migration-center/index.js';
import { ArcProtoCenter } from './photo-center/index.js';
import { ArcRedirect } from './redirect/index.js';
import { ArcRetailEvents } from './retail-events/index.js';
import { ArcDeveloperRetail } from './developer-retail/index.js';
import { ArcSales, ArcSalesV2 } from './sales/index.js';
import { ArcSigningService } from './signing-service/index.js';
import { ArcSite } from './site/index.js';
import { ArcTags } from './tags/index.js';
import { ArcWebsked } from './websked/index.js';

export const ArcAPI = (options: ArcAPIOptions) => {
  const API = {
    Author: new ArcAuthor(options),
    Draft: new ArcDraft(options),
    Identity: new ArcIdentity(options),
    IFX: new ArcIFX(options),
    Redirect: new ArcRedirect(options),
    MigrationCenter: new ArcMigrationCenter(options),
    Sales: new ArcSales(options),
    SalesV2: new ArcSalesV2(options),
    Site: new ArcSite(options),
    Websked: new ArcWebsked(options),
    Content: new ArcContent(options),
    SigningService: new ArcSigningService(options),
    PhotoCenter: new ArcProtoCenter(options),
    GlobalSettings: new GlobalSettings(options),
    Tags: new ArcTags(options),
    ContentOps: new ArcContentOps(options),
    RetailEvents: new ArcRetailEvents(options),
    DeveloperRetail: new ArcDeveloperRetail(options),
    Custom: new Custom(options),
  };

  API.MigrationCenter.setMaxRPS(12);
  API.Draft.setMaxRPS(4);
  API.Content.setMaxRPS(3);

  return API;
};

export type ArcAPIType = ReturnType<typeof ArcAPI>;
