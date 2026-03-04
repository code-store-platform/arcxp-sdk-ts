import platform from '../../lib/platform/index.js';
import { ArcAbstractAPI, type ArcAPIOptions } from '../abstract-api.js';
import type {
  AddSecretPayload,
  Bundle,
  CreateIntegrationPayload,
  CreateWebhookPayload,
  CustomEvent,
  CustomEventUpdatePayload,
  GenereteDeleteTokenResponse,
  GetBundlesResponse,
  GetCustomEventsResponse,
  GetEventHistoryParams,
  GetEventHistoryResponse,
  GetEventPayloadResponse,
  GetIntegrationsResponse,
  GetLogQueriesResponse,
  GetLogsResponse,
  GetSubscriptionsResponse,
  GetWebhooksResponse,
  InitializeLogQueryParams,
  IntegrationDetail,
  SubscribePayload,
  TriggerWebhookPayload,
  UpdateIntegrationPayload,
  Webhook,
} from './types.js';

export class ArcIFX extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'ifx/api/v1' });
  }

  // ---------------------------------------------------------------------------
  // Integrations
  // ---------------------------------------------------------------------------

  async createIntegration(payload: CreateIntegrationPayload): Promise<void> {
    await this.client.post('/admin/integration', payload);
  }

  async getIntegration(integrationName: string): Promise<IntegrationDetail> {
    const { data } = await this.client.get<IntegrationDetail>(`/admin/integration/${integrationName}`);
    return data;
  }

  async getIntegrations(page = 1, pageSize = 50): Promise<GetIntegrationsResponse> {
    const { data } = await this.client.get<GetIntegrationsResponse>('/admin/integration', {
      params: { page, pageSize },
    });
    return data;
  }

  async updateIntegration(integrationName: string, payload: UpdateIntegrationPayload): Promise<void> {
    await this.client.put(`/admin/integration/${integrationName}`, payload);
  }

  async deleteIntegration(integrationName: string, token: string): Promise<void> {
    await this.client.delete(`/admin/integration/${integrationName}`, { params: { token } });
  }

  async generateDeleteIntegrationToken(integrationName: string): Promise<GenereteDeleteTokenResponse> {
    const { data } = await this.client.get<GenereteDeleteTokenResponse>(
      `/admin/integration/${integrationName}/token`,
    );
    return data;
  }

  // ---------------------------------------------------------------------------
  // Bundles
  // ---------------------------------------------------------------------------

  async getBundles(integrationName: string): Promise<GetBundlesResponse> {
    const { data } = await this.client.get<GetBundlesResponse>(`/admin/bundles/${integrationName}`);
    return data;
  }

  async uploadBundle(integrationName: string, name: string, bundlePath: string): Promise<Bundle> {
    const fs = await platform.fs();
    const FormData = await platform.form_data();

    const form = new FormData();
    const bundle = fs.createReadStream(bundlePath);

    form.append('bundle', bundle);
    form.append('name', name);

    const { data } = await this.client.post<Bundle>(`/admin/bundles/${integrationName}`, form, {
      headers: form.getHeaders(),
    });
    return data;
  }

  async deployBundle(integrationName: string, bundleName: string): Promise<Bundle> {
    const { data } = await this.client.post<Bundle>(`/admin/bundles/${integrationName}/deploy/${bundleName}`);
    return data;
  }

  async downloadBundle(integrationName: string, bundleName: string): Promise<Buffer> {
    const { data } = await this.client.get<Buffer>(`/admin/bundles/${integrationName}/download/${bundleName}`, {
      responseType: 'arraybuffer',
    });
    return data;
  }

  async promoteBundle(integrationName: string, version: number): Promise<Bundle> {
    const { data } = await this.client.post<Bundle>(`/admin/bundles/${integrationName}/promote/${version}`);
    return data;
  }

  // ---------------------------------------------------------------------------
  // Event Subscriptions
  // ---------------------------------------------------------------------------

  async subscribe(payload: SubscribePayload) {
    const { data } = await this.client.post('/admin/events/subscriptions', payload);
    return data;
  }

  async updateSubscription(payload: SubscribePayload) {
    const { data } = await this.client.put('/admin/events/subscriptions', payload);
    return data;
  }

  async getSubscriptions(): Promise<GetSubscriptionsResponse> {
    const { data } = await this.client.get<GetSubscriptionsResponse>('/admin/events/subscriptions');
    return data;
  }

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------

  async getEventPayload(integrationName: string, invocationId: string): Promise<GetEventPayloadResponse> {
    const { data } = await this.client.get<GetEventPayloadResponse>(
      `/eventdata/${integrationName}/${invocationId}`,
    );
    return data;
  }

  async getEventHistory(
    integrationName: string,
    params?: GetEventHistoryParams,
  ): Promise<GetEventHistoryResponse> {
    const { data } = await this.client.get<GetEventHistoryResponse>(
      `/admin/events/${integrationName}/history`,
      { params },
    );
    return data;
  }

  // ---------------------------------------------------------------------------
  // Custom Events
  // ---------------------------------------------------------------------------

  async getCustomEvents(page = 1, pageSize = 50): Promise<GetCustomEventsResponse> {
    const { data } = await this.client.get<GetCustomEventsResponse>('/admin/events/custom', {
      params: { page, pageSize },
    });
    return data;
  }

  async createCustomEvent(payload: CustomEvent): Promise<CustomEvent> {
    const { data } = await this.client.post<CustomEvent>('/admin/events/custom', payload);
    return data;
  }

  async updateCustomEvent(eventName: string, payload: CustomEventUpdatePayload): Promise<CustomEvent> {
    const { data } = await this.client.put<CustomEvent>(`/admin/events/custom/${eventName}`, payload);
    return data;
  }

  async deleteCustomEvent(eventName: string): Promise<{ message: string }> {
    const { data } = await this.client.delete<{ message: string }>(`/admin/events/custom/${eventName}`);
    return data;
  }

  async deleteCustomEventSchedule(eventName: string): Promise<{ message: string }> {
    const { data } = await this.client.delete<{ message: string }>(
      `/admin/events/custom/${eventName}/schedule`,
    );
    return data;
  }

  // ---------------------------------------------------------------------------
  // Webhooks
  // ---------------------------------------------------------------------------

  async getWebhooks(page = 1, pageSize = 50): Promise<GetWebhooksResponse> {
    const { data } = await this.client.get<GetWebhooksResponse>('/admin/events/custom/webhooks', {
      params: { page, pageSize },
    });
    return data;
  }

  async createWebhook(eventName: string, payload?: CreateWebhookPayload): Promise<Webhook> {
    const { data } = await this.client.post<Webhook>(
      `/admin/events/custom/${eventName}/webhooks`,
      payload ?? {},
    );
    return data;
  }

  async updateWebhook(eventName: string, payload: CreateWebhookPayload): Promise<Webhook> {
    const { data } = await this.client.put<Webhook>(`/admin/events/custom/${eventName}/webhooks`, payload);
    return data;
  }

  async deleteWebhook(eventName: string): Promise<{ message: string }> {
    const { data } = await this.client.delete<{ message: string }>(
      `/admin/events/custom/${eventName}/webhooks`,
    );
    return data;
  }

  async triggerWebhook(uuid: string, payload: TriggerWebhookPayload): Promise<void> {
    await this.client.post(`/webhook/${uuid}`, payload);
  }

  // ---------------------------------------------------------------------------
  // Secrets
  // ---------------------------------------------------------------------------

  async addSecret(payload: AddSecretPayload) {
    const { data } = await this.client.post(`/admin/secret?integrationName=${payload.integrationName}`, {
      secretName: payload.secretName,
      secretValue: payload.secretValue,
    });
    return data;
  }

  async updateSecret(payload: AddSecretPayload) {
    const { data } = await this.client.put(`/admin/secret?integrationName=${payload.integrationName}`, {
      secretName: payload.secretName,
      secretValue: payload.secretValue,
    });
    return data;
  }

  async getSecrets(integrationName: string): Promise<string[]> {
    const { data } = await this.client.get<string[]>(`/admin/secret`, { params: { integrationName } });
    return data;
  }

  // ---------------------------------------------------------------------------
  // Logs
  // ---------------------------------------------------------------------------

  async initializeLogQuery(
    integrationName: string,
    params?: InitializeLogQueryParams,
  ): Promise<{ queryId: string }> {
    const { data } = await this.client.get<{ queryId: string }>(
      `/admin/logs/integration/${integrationName}`,
      { params },
    );
    return data;
  }

  async getLogs(queryId: string, raw = false): Promise<GetLogsResponse> {
    const { data } = await this.client.get<GetLogsResponse>('/admin/logs/results', {
      params: { queryId, raw },
    });
    return data;
  }

  async cancelLogQuery(queryId: string): Promise<{ message: string }> {
    const { data } = await this.client.delete<{ message: string }>('/admin/logs/cancel', {
      params: { queryId },
    });
    return data;
  }

  async getLogQueries(page?: number, pageSize?: number): Promise<GetLogQueriesResponse> {
    const { data } = await this.client.get<GetLogQueriesResponse>('/admin/logs/queries', {
      params: { page, pageSize },
    });
    return data;
  }
}
