import type { UserAttribute } from '../identity/types';
import type { Website } from '../../types/ans-types';

export type MigrateBatchSubscriptionsPayload = {
  subscriptions: (PaidSubscription | FreeSubscription | SharedSubscription | LinkedSubscription)[];
  payments: PaymentInfo[];
};

export type MigrateBatchSubscriptionsParams = {
  website: Website;
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
  paymentMethod?: Record<string, any>;
  attributes?: UserAttribute[];
}

export interface PaidSubscription extends BaseSubscription {
  type: 'paid';
  priceCode: string;
  currentCycle: number;
  nextEventDateUTC: string;
  paymentMethod: {
    providerID: number;
    token: string;
    [key: string]: any;
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
export interface LinkedSubscription extends BaseSubscription {
  type: 'linked';
  nextEventDateUTC?: string;
  paymentMethod: {
    providerID: number;
    [key: string]: any;
  };
}

export interface SharedSubscription extends BaseSubscription {
  type: 'shared';
  nextEventDateUTC?: string;
  paymentMethod: {
    providerID: number;
    [key: string]: any;
  };
}

export interface FreeSubscription extends BaseSubscription {
  type: 'free';
  nextEventDateUTC?: string;
  paymentMethod: {
    providerID: number;
    [key: string]: any;
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
