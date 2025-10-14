import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api.js';
import type { ArcRedirectRuleContentType, ArcRedirectRuleType, ArcRedirectRulesResponse } from './types.js';

export class ArcRedirect extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'delivery-api/v1/cloudlet/redirector/site' });
  }

  async getRedirects(orgSiteEnv: string): Promise<ArcRedirectRulesResponse> {
    const { data } = await this.client.get(`/${orgSiteEnv}/rule?limit=1000`);
    return data;
  }

  async updateArcRedirectRule(
    orgSiteEnv: string,
    redirectID: string,
    redirectRuleContent: ArcRedirectRuleContentType
  ): Promise<ArcRedirectRuleType> {
    const { data } = await this.client.put(`/${orgSiteEnv}/rule/${redirectID}`, redirectRuleContent);
    return data;
  }

  async activateRedirectsVersion(orgSiteEnv: string): Promise<{ task_id: string }> {
    const { data } = await this.client.post(`/${orgSiteEnv}/version`);
    return data;
  }
}
