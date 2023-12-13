import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { ArcRedirectRuleContentType, ArcRedirectRulesResponse, ArcRedirectRuleType } from './types';

export class ArcRedirect extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: `delivery-api/v1/cloudlet/redirector/site/${options.credentials.orgSiteEnv}` });
  }

  async getRedirects(): Promise<ArcRedirectRulesResponse> {
    const { data } = await this.client.get(`/rule?limit=1000`);
    return data;
  }

  async updateArcRedirectRule(
    redirectID: string,
    redirectRuleContent: ArcRedirectRuleContentType
  ): Promise<ArcRedirectRuleType> {
    const { data } = await this.client.put(`/rule/${redirectID}`, redirectRuleContent);
    return data;
  }

  async activateRedirectsVersion(): Promise<{ task_id: string }> {
    const { data } = await this.client.post(`/version`);
    return data;
  }
}
