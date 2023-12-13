import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { ArcRedirectRuleContentType, ArcRedirectRulesResponse, ArcRedirectRuleType } from './types';

export class ArcRedirect extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: `delivery-api/v1/cloudlet/redirector/site` });
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
