import { createReadStream } from 'node:fs';
import FormData from 'form-data';
import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api';
import type {
  AddSecretPayload,
  Bundle,
  CreateIntegrationPayload,
  GenereteDeleteTokenResponse,
  GetBundlesResponse,
  GetSubscriptionsResponse,
  Integration,
  SubscribePayload,
  UpdateIntegrationPayload,
} from './types';

export class ArcIFX extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'ifx/api/v1' });
  }

  async createIntegration(payload: CreateIntegrationPayload) {
    await this.client.post('/admin/integration', payload);
  }

  async updateIntegration(integrationName: string, payload: UpdateIntegrationPayload) {
    await this.client.put(`/admin/integration/${integrationName}`, payload);
  }

  async deleteIntegration(integrationName: string, token: string) {
    await this.client.delete(`/admin/integration/${integrationName}`, { params: { token } });
  }

  async generateDeleteIntegrationToken(integrationName: string) {
    const response = await this.client.get<GenereteDeleteTokenResponse>(`/admin/integration/${integrationName}/token`);

    return response.data;
  }

  async getIntegrations() {
    const { data } = await this.client.get<Integration[]>('/admin/integrations');
    return data;
  }

  async getJobs(integrationName: string) {
    const { data } = await this.client.get(`/admin/jobs/status/${integrationName}`);
    return data;
  }

  async getStatus(integrationName: string) {
    const { data } = await this.client.get(`/admin/integration/${integrationName}/provisionStatus`);
    return data;
  }

  async initializeQuery(integrationName: string, query?: string) {
    const { data } = await this.client.get<{ queryId: string }>(`/admin/logs/integration/${integrationName}?${query}`);
    return data;
  }

  async getLogs(queryId: string, raw = true) {
    const { data } = await this.client.get('/admin/logs/results', { params: { queryId, raw } });
    return data;
  }

  async subscribe(payload: SubscribePayload) {
    const { data } = await this.client.post('/admin/events/subscriptions', payload);
    return data;
  }

  async updateSubscription(payload: SubscribePayload) {
    const { data } = await this.client.put('/admin/events/subscriptions', payload);
    return data;
  }

  async getSubscriptions() {
    const { data } = await this.client.get<GetSubscriptionsResponse>('/admin/events/subscriptions');
    return data;
  }

  async addSecret(payload: AddSecretPayload) {
    const { data } = await this.client.post(`/admin/secret?integrationName=${payload.integrationName}`, {
      secretName: payload.secretName,
      secretValue: payload.secretValue,
    });
    return data;
  }

  async getSecrets(integrationName: string) {
    const { data } = await this.client.get(`/admin/secret?integrationName=${integrationName}`);
    return data;
  }

  async getBundles(integrationName: string) {
    const { data } = await this.client.get<GetBundlesResponse>(`/admin/bundles/${integrationName}`);
    return data;
  }

  async uploadBundle(integrationName: string, name: string, bundlePath: string) {
    const bundle = createReadStream(bundlePath);
    const form = new FormData();

    form.append('bundle', bundle);
    form.append('name', name);

    const { data } = await this.client.post<Bundle>(`/admin/bundles/${integrationName}`, form, {
      headers: form.getHeaders(),
    });
    return data;
  }

  async deployBundle(integrationName: string, name: string) {
    const { data } = await this.client.post<Bundle>(`/admin/bundles/${integrationName}/deploy/${name}`);
    return data;
  }

  async promoteBundle(integrationName: string, version: number) {
    const { data } = await this.client.post<Bundle>(`/admin/bundles/${integrationName}/promote/${version}`);
    return data;
  }
}
