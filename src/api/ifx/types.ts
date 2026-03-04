export type CreateIntegrationPayload = {
  integrationName: string;
  description: string;
  email: string;
  runtime: 'node';
};

export type UpdateIntegrationPayload = {
  email: string;
  enabled: boolean;
};

export type SubscribePayload = {
  eventName: string;
  integrationName: string;
  enabled: boolean;
};

export type EventSubscription = {
  eventName: string;
  enabled: boolean;
  integrationEnabled: boolean;
  integrationName: string;
};

export type AddSecretPayload = {
  integrationName: string;
  secretName: string;
  secretValue: string;
};

export type GetBundlesResponse = {
  page: number;
  pageSize: number;
  totalCount: number;
  results: Bundle[];
};

export type GetSubscriptionsResponse = {
  subscriptions: EventSubscription[];
};

export type Bundle = {
  name: string;
  integrationName: string;
  organizationId: string;
  status: string;
  uploadedOn: string;
  deployVersion?: number;
  deployedOn?: string;
  promotedOn?: string;
};

export type Integration = {
  ProvisionedConcurrencyMin: number;
  Runtime: 'node';
  Description: string;
  ProvisionedConcurrencyMax: number;
  ProvisionPAT: boolean;
  IntegrationName: string;
  Enabled: boolean;
  OrganizationIntegrationName: string;
  CreationDate: number;
  DatadogEnabled: boolean;
  OrganizationName: string;
};

export type GenereteDeleteTokenResponse = {
  deleteToken: string;
};

// --- Integrations ---

export type IntegrationDetail = {
  integrationName: string;
  enabled: boolean;
  description: string;
  runtime: string;
  email: string;
  liveBundle: string;
  created: string;
  status: string;
};

export type GetIntegrationsResponse = {
  page: number;
  pageSize: number;
  totalCount: number;
  results: IntegrationDetail[];
};

// --- Events ---

export type EventInvocation = {
  invocationID: string;
  eventTime: string;
  eventStatus: string;
  eventName: string;
  payloadUrl: string;
  logsUrl: string;
};

export type GetEventHistoryParams = {
  start?: string;
  end?: string;
  from?: string;
  size?: number;
  eventName?: string;
  eventStatus?: string;
};

export type GetEventHistoryResponse = {
  from: string | null;
  count: number;
  size: number;
  events: EventInvocation[];
};

export type GetEventPayloadResponse = {
  payload: Record<string, unknown>;
};

// --- Custom Events ---

export type CustomEventSchedule = {
  cron: string;
};

export type CustomEvent = {
  eventName: string;
  description?: string;
  schedule?: CustomEventSchedule;
};

export type CustomEventUpdatePayload = {
  description?: string;
  schedule?: CustomEventSchedule;
};

export type GetCustomEventsResponse = {
  page: number;
  pageSize: number;
  totalCount: number;
  results: CustomEvent[];
};

// --- Webhooks ---

export type Webhook = {
  webhookUrl: string;
  eventName: string;
  description: string;
};

export type CreateWebhookPayload = {
  description?: string;
};

export type GetWebhooksResponse = {
  page: number;
  pageSize: number;
  totalCount: number;
  results: Webhook[];
};

export type TriggerWebhookPayload = Record<string, unknown>;

// --- Logs ---

export type InitializeLogQueryParams = {
  start?: number;
  end?: number;
  limit?: number;
  sort?: 'asc' | 'desc';
  q?: string;
  queryName?: string;
};

export type LogEvent = {
  timestamp: string;
  message: string;
  logStream: string;
};

export type GetLogsResponse = {
  status: string;
  statistics: {
    recordsMatched: number;
    recordsScanned: number;
    bytesScanned: number;
  };
  events: LogEvent[];
};

export type LogQuery = {
  queryId: string;
  created: number;
  createdBy: string;
  startTime: number;
  endTime: number;
  integrationName: string;
  queryName: string;
  limit: number;
  sort: string;
  queryString: string;
  status: string;
};

export type GetLogQueriesResponse = {
  page: number;
  pageSize: number;
  totalCount: number;
  results: LogQuery[];
};
