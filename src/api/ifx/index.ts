import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { AddSecretPayload, CreateIntegrationPayload, SubscribePayload, UpdateIntegrationPayload } from './types';

export class ArcIFX extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'ifx/api/v1' });
  }

  async createIntegration(payload: CreateIntegrationPayload) {
    await this.client.post('/admin/integration', payload);
  }

  async updateIntegration(payload: UpdateIntegrationPayload) {
    await this.client.put('/admin/integration', payload);
  }

  async getIntegrations() {
    const { data } = await this.client.get('/admin/integrations');
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

  async getLogs(queryId: string) {
    const { data } = await this.client.get(`/admin/logs/results?queryId=${queryId}`);
    return data;
  }

  async subscribe(payload: SubscribePayload) {
    const { data } = await this.client.post('/admin/events/subscriptions', payload);
    return data;
  }

  async getSubscriptions() {
    const { data } = await this.client.get('/admin/events/subscriptions');
    return data;
  }

  async addSecret(payload: AddSecretPayload) {
    const { data } = await this.client.post(`/admin/secret?integrationName=${payload.intergrationName}`, {
      secretName: payload.secretName,
      secretValue: payload.secretValue,
    });
    return data;
  }

  async getSecrets(integrationName: string) {
    const { data } = await this.client.get(`/admin/secret?integrationName=${integrationName}`);
    return data;
  }
}
