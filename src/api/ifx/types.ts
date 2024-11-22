export type CreateIntegrationPayload = {
  integrationName: string;
  description: string;
  email: string;
  provisionPAT: boolean;
  githubUsernames: string[];
  runtime: 'node';
};

export type UpdateIntegrationPayload = {
  integrationName: string;
  enabled: boolean;
  githubUsernames: string[];
  githubUserAction: 'add' | 'replace';
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
