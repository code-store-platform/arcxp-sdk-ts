// ============================================
// Pagination Types
// ============================================
export type PaginatedResponse<T> = {
  result: T;
  lastPage: number;
  page: number;
  size: number;
  sort: string;
  sortDirection: string;
  totalCount: number;
};

export type PaginationParams = {
  page?: number;
  size?: number;
  sort?: string;
  sortDirection?: 'ASC' | 'DESC';
  search?: string;
};

// ============================================
// Retail Product Types
// ============================================

export type RetailProductAttribute = {
  id: number;
  name: string;
  value: string;
};

export type RetailProduct = {
  createdOn?: string;
  createdBy?: string;
  modifiedOn?: string;
  modifiedBy?: string;
  id: number;
  sku: string;
  active: boolean;
  gift: boolean;
  taxInclusive: boolean;
  description: string;
  shortDescription: string;
  image: string;
  imageAction?: string;
  name: string;
  thumbnail: string;
  maxSubscriptionAssociations?: number;
  attributes: RetailProductAttribute[];
  publishedOfferCount: number;
  publishedOnOffer: boolean;
  type: 'Subscription' | 'Physical' | 'Override' | 'Event';
  defaultSwgProduct: boolean;
  onHand: number;
  productTaxCode?: string;
  productURL?: string;
  redirectURLs?: string[];
};

export type GetRetailProductByIdParams = {
  site?: string;
};

export type GetRetailProductBySkuParams = {
  site?: string;
};

export type GetRetailProductByPriceCodeParams = {
  site?: string;
};

export type GetAllRetailProductsParams = PaginationParams & {
  site?: string;
};

export type GetAllRetailProductsResponse = PaginatedResponse<RetailProduct[]>;

// ============================================
// Retail Pricing Strategy Types
// ============================================

export type RetailPricingRate = {
  createdOn?: string;
  createdBy?: string;
  modifiedOn?: string;
  modifiedBy?: string;
  id: number;
  amount: number;
  billingCount: number;
  billingFrequency: 'Day' | 'Week' | 'Month' | 'Year' | 'OneTime' | 'Hour';
  durationCount: number;
  duration: 'Week' | 'Month' | 'Year' | 'UntilCancelled' | 'Day' | 'Hour';
  taxInclusive: boolean;
};

export type RetailPricingStrategy = {
  createdOn?: string;
  createdBy?: string;
  modifiedOn?: string;
  modifiedBy?: string;
  id: number;
  priceCode: string;
  name: string;
  description: string;
  productId?: number;
  active: boolean;
  gift: boolean;
  summary: string;
  currencyCode: string;
  currencyDisplayFormat: string;
  currencyLocale: string;
  rates: RetailPricingRate[];
  publishedOffers?: Record<string, string>;
  taxInclusive: boolean;
  pricingRates: RetailPricingRate[];
  changeEligible: boolean;
};

export type GetRetailPricingStrategyByIdParams = {
  site?: string;
};

export type GetAllRetailPricingStrategiesParams = PaginationParams & {
  site?: string;
};

export type GetAllRetailPricingStrategiesResponse = PaginatedResponse<RetailPricingStrategy[]>;

// ============================================
// Retail Pricing Rate Types
// ============================================

export type GetRetailPricingRateByIdParams = {
  site?: string;
};

export type GetAllRetailPricingRatesParams = PaginationParams & {
  site?: string;
};

export type GetAllRetailPricingRatesResponse = PaginatedResponse<RetailPricingRate[]>;

// ============================================
// Retail Pricing Cycle Types
// ============================================

export type RetailPricingCycle = {
  timeUMType: string;
  timeQty: number;
  price: number;
  finalPayment: boolean;
  paymentDate: string;
  gift: boolean;
  durationType: string;
  durationQty: number;
  currency: string;
};

export type GetRetailPricingCycleParams = {
  site?: string;
};

// ============================================
// Retail Campaign Types
// ============================================

export type RetailCampaignCategory = {
  createdOn?: string;
  createdBy?: string;
  modifiedOn?: string;
  modifiedBy?: string;
  id: number;
  name: string;
  level: number;
  inUse: boolean;
  children?: RetailCampaignCategory[];
};

export type RetailCampaign = {
  createdOn?: string;
  createdBy?: string;
  modifiedOn?: string;
  modifiedBy?: string;
  id: number;
  canRenew: boolean;
  canRestart: boolean;
  canStart: boolean;
  name: string;
  validFrom: string;
  validUntil: string;
  publishedOffers?: Record<string, string>;
  publishedProducts?: Record<string, string>;
  publishedPrices?: Record<string, string>;
  campaignCategory?: RetailCampaignCategory;
  campaignCategories?: RetailCampaignCategory[];
  offerId?: number;
};

export type GetRetailCampaignByIdParams = {
  site?: string;
};

export type GetRetailCampaignByNameParams = {
  site?: string;
};

export type GetAllRetailCampaignsParams = PaginationParams & {
  site?: string;
};

export type GetAllRetailCampaignsResponse = PaginatedResponse<RetailCampaign[]>;

// ============================================
// Retail Campaign Category Types
// ============================================

export type GetRetailCampaignCategoryByIdParams = {
  site?: string;
};

export type GetAllRetailCampaignCategoriesParams = PaginationParams & {
  site?: string;
};

export type GetAllRetailCampaignCategoriesResponse = PaginatedResponse<RetailCampaignCategory[]>;

// ============================================
// Retail Offer Types
// ============================================

export type RetailOfferAttribute = {
  id: number;
  name: string;
  value: string;
};

export type RetailOfferProduct = {
  createdOn?: string;
  createdBy?: string;
  modifiedOn?: string;
  modifiedBy?: string;
  product: RetailProduct;
  productOverride: RetailProduct;
  pricingStrategies: RetailPricingStrategy[];
};

export type RetailOffer = {
  createdOn?: string;
  createdBy?: string;
  modifiedOn?: string;
  modifiedBy?: string;
  id: number;
  name: string;
  active: boolean;
  isDefault: boolean;
  disclaimerText: string;
  largeImage: string;
  mediumImage: string;
  smallImage: string;
  pageSubTitle: string;
  pageTitle: string;
  published: boolean;
  publishedOn?: string;
  templateName: string;
  publishedBy?: number;
  validFrom: string;
  validUntil: string;
  products: RetailOfferProduct[];
  campaigns: RetailCampaign[];
  attributes: RetailOfferAttribute[];
};

export type GetRetailOfferByIdParams = {
  site?: string;
};

export type GetAllRetailOffersParams = PaginationParams & {
  site?: string;
};

export type GetAllRetailOffersResponse = PaginatedResponse<RetailOffer[]>;

// ============================================
// Retail Offer Attribute Types
// ============================================

export type GetRetailOfferAttributeByIdParams = {
  site?: string;
};

export type GetAllRetailOfferAttributesParams = PaginationParams & {
  site?: string;
};

export type GetAllRetailOfferAttributesResponse = PaginatedResponse<RetailOfferAttribute[]>;

// ============================================
// Retail Product Attribute Types
// ============================================

export type GetRetailProductAttributeByIdParams = {
  site?: string;
};

export type GetAllRetailProductAttributesParams = PaginationParams & {
  site?: string;
};

export type GetAllRetailProductAttributesResponse = PaginatedResponse<RetailProductAttribute[]>;

// ============================================
// Retail Condition Category Types
// ============================================

export type RetailConditionValue = {
  createdBy: number;
  createdOn: string;
  deletedOn: string;
  modifiedBy: number;
  modifiedOn: string;
  createdName: string;
  modifiedName: string;
  externalID: number;
  id: number;
  value: string;
  tenantID: number;
};

export type RetailConditionCategory = {
  createdOn?: string;
  createdBy?: string;
  modifiedOn?: string;
  modifiedBy?: string;
  id: number;
  conditionType: 'CONTENT' | 'AUDIENCE' | 'ENTITLEMENT';
  name: string;
  values: RetailConditionValue[];
  tenantID: number;
};

export type GetAllRetailConditionCategoriesParams = PaginationParams & {
  site?: string;
};

export type GetAllRetailConditionCategoriesResponse = PaginatedResponse<RetailConditionCategory[]>;
