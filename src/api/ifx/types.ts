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

export type AddSecretPayload = {
  integrationName: string;
  secretName: string;
  secretValue: string;
};
