export type MigrateBatchSubscriptionsPayload = {
  subscriptions: (PaidSubscription | FreeSubscription)[];
  payments: PaymentInfo[];
};

export type MigrateBatchSubscriptionsResponse = {
  subscriptionsInBatch?: number;
  batchID?: string;
};

interface BaseSubscription {
  type: string;
  legacyID: string;
  ownerClientID: string;
  sku: string;
  priceCode: string;
  currentCycle: number;
  nextEventDateUTC: string;
  paymentMethod?: Record<string, any>;
}

export interface PaidSubscription extends BaseSubscription {
  legacyID: string;
  ownerClientID: string;
  sku: string;
  priceCode: string;
  currentCycle: number;
  nextEventDateUTC: string;
  type: 'paid';
  paymentMethod: {
    providerID: number;
    token: string;
    [key: string]: any,
  };
  billingAddress: {
    line1?: string | null | undefined;
    line2?: string | null | undefined;
    locality?: string | null | undefined;
    region?: string | null | undefined;
    postal?: string | null | undefined;
    country: string;
  };
}

export interface FreeSubscription extends BaseSubscription {
  type: 'free';
  paymentMethod: {
    providerID: number;
    token: string;
  };
}

export type PaymentInfo = {
  legacySubscriptionID: string;
  type: 'payment';
  paymentDateUTC: string;
  amount: number;
  currency: string;
  tax: number;
  periodFromUTC?: string;
  periodUntilUTC?: string;
  refunds: null | Refund[];
};

export type Refund = {
  /**
   * 'YYYY-MM-DD HH24:mm – e.g. 2019-04-25 01:02 – refund date';
   */
  refundDateUTC: string;
  amount: number;
  currency: string;
  tax: number;
  providerReference?: string;
};
