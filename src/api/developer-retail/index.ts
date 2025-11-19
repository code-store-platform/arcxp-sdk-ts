import { type ArcAPIOptions, ArcAbstractAPI } from '../abstract-api.js';
import type {
  GetAllRetailCampaignCategoriesParams,
  GetAllRetailCampaignCategoriesResponse,
  GetAllRetailCampaignsParams,
  GetAllRetailCampaignsResponse,
  GetAllRetailConditionCategoriesParams,
  GetAllRetailConditionCategoriesResponse,
  GetAllRetailOfferAttributesParams,
  GetAllRetailOfferAttributesResponse,
  GetAllRetailOffersParams,
  GetAllRetailOffersResponse,
  GetAllRetailPricingRatesParams,
  GetAllRetailPricingRatesResponse,
  GetAllRetailPricingStrategiesParams,
  GetAllRetailPricingStrategiesResponse,
  GetAllRetailProductAttributesParams,
  GetAllRetailProductAttributesResponse,
  GetAllRetailProductsParams,
  GetAllRetailProductsResponse,
  GetRetailCampaignByIdParams,
  GetRetailCampaignByNameParams,
  GetRetailCampaignCategoryByIdParams,
  GetRetailOfferAttributeByIdParams,
  GetRetailOfferByIdParams,
  GetRetailPricingCycleParams,
  GetRetailPricingRateByIdParams,
  GetRetailPricingStrategyByIdParams,
  GetRetailProductAttributeByIdParams,
  GetRetailProductByIdParams,
  GetRetailProductByPriceCodeParams,
  GetRetailProductBySkuParams,
  RetailCampaign,
  RetailCampaignCategory,
  RetailOffer,
  RetailOfferAttribute,
  RetailPricingCycle,
  RetailPricingRate,
  RetailPricingStrategy,
  RetailProduct,
  RetailProductAttribute,
} from './types.js';

export class ArcDeveloperRetail extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'retail/api/v1' });
  }

  // ============================================
  // Product Methods
  // ============================================

  async getProductById(id: number, params?: GetRetailProductByIdParams): Promise<RetailProduct> {
    const { data } = await this.client.get(`/product/${id}`, { params });
    return data;
  }

  async getProductBySku(sku: string, params?: GetRetailProductBySkuParams): Promise<RetailProduct> {
    const { data } = await this.client.get(`/product/sku/${sku}`, { params });
    return data;
  }

  async getProductByPriceCode(priceCode: number, params?: GetRetailProductByPriceCodeParams): Promise<RetailProduct> {
    const { data } = await this.client.get(`/product/pricecode/${priceCode}`, { params });
    return data;
  }

  async getAllProducts(params?: GetAllRetailProductsParams): Promise<GetAllRetailProductsResponse> {
    const { data } = await this.client.get('/product', { params });
    return data;
  }

  // ============================================
  // Pricing Strategy Methods
  // ============================================

  async getPricingStrategyById(
    id: number,
    params?: GetRetailPricingStrategyByIdParams
  ): Promise<RetailPricingStrategy> {
    const { data } = await this.client.get(`/pricing/strategy/${id}`, { params });
    return data;
  }

  async getAllPricingStrategies(
    params?: GetAllRetailPricingStrategiesParams
  ): Promise<GetAllRetailPricingStrategiesResponse> {
    const { data } = await this.client.get('/pricing/strategy', { params });
    return data;
  }

  // ============================================
  // Pricing Rate Methods
  // ============================================

  async getPricingRateById(id: number, params?: GetRetailPricingRateByIdParams): Promise<RetailPricingRate> {
    const { data } = await this.client.get(`/pricing/rate/${id}`, { params });
    return data;
  }

  async getAllPricingRates(params?: GetAllRetailPricingRatesParams): Promise<GetAllRetailPricingRatesResponse> {
    const { data } = await this.client.get('/pricing/rate', { params });
    return data;
  }

  // ============================================
  // Pricing Cycle Methods
  // ============================================

  async getPricingCycle(
    priceCode: number,
    cycleIndex: number,
    startDate: string,
    params?: GetRetailPricingCycleParams
  ): Promise<RetailPricingCycle> {
    const { data } = await this.client.get(`/pricing/cycle/${priceCode}/${cycleIndex}/${startDate}`, {
      params,
    });
    return data;
  }

  // ============================================
  // Campaign Methods
  // ============================================

  async getCampaignById(id: number, params?: GetRetailCampaignByIdParams): Promise<RetailCampaign> {
    const { data } = await this.client.get(`/campaign/${id}`, { params });
    return data;
  }

  async getCampaignByName(campaignName: string, params?: GetRetailCampaignByNameParams): Promise<RetailCampaign> {
    const { data } = await this.client.get(`/campaign/${campaignName}/get`, { params });
    return data;
  }

  async getAllCampaigns(params?: GetAllRetailCampaignsParams): Promise<GetAllRetailCampaignsResponse> {
    const { data } = await this.client.get('/campaign', { params });
    return data;
  }

  // ============================================
  // Campaign Category Methods
  // ============================================

  async getCampaignCategoryById(
    id: number,
    params?: GetRetailCampaignCategoryByIdParams
  ): Promise<RetailCampaignCategory> {
    const { data } = await this.client.get(`/campaign/category/${id}`, { params });
    return data;
  }

  async getAllCampaignCategories(
    params?: GetAllRetailCampaignCategoriesParams
  ): Promise<GetAllRetailCampaignCategoriesResponse> {
    const { data } = await this.client.get('/campaign/category', { params });
    return data;
  }

  // ============================================
  // Offer Methods
  // ============================================

  async getOfferById(id: number, params?: GetRetailOfferByIdParams): Promise<RetailOffer> {
    const { data } = await this.client.get(`/offer/${id}`, { params });
    return data;
  }

  async getAllOffers(params?: GetAllRetailOffersParams): Promise<GetAllRetailOffersResponse> {
    const { data } = await this.client.get('/offer', { params });
    return data;
  }

  // ============================================
  // Offer Attribute Methods
  // ============================================

  async getOfferAttributeById(id: number, params?: GetRetailOfferAttributeByIdParams): Promise<RetailOfferAttribute> {
    const { data } = await this.client.get(`/offer/attribute/${id}`, { params });
    return data;
  }

  async getAllOfferAttributes(
    params?: GetAllRetailOfferAttributesParams
  ): Promise<GetAllRetailOfferAttributesResponse> {
    const { data } = await this.client.get('/offer/attribute', { params });
    return data;
  }

  // ============================================
  // Product Attribute Methods
  // ============================================

  async getProductAttributeById(
    id: number,
    params?: GetRetailProductAttributeByIdParams
  ): Promise<RetailProductAttribute> {
    const { data } = await this.client.get(`/product/attribute/${id}`, { params });
    return data;
  }

  async getAllProductAttributes(
    params?: GetAllRetailProductAttributesParams
  ): Promise<GetAllRetailProductAttributesResponse> {
    const { data } = await this.client.get('/product/attribute', { params });
    return data;
  }

  // ============================================
  // Condition Category Methods
  // ============================================

  async getAllConditionCategories(
    params?: GetAllRetailConditionCategoriesParams
  ): Promise<GetAllRetailConditionCategoriesResponse> {
    const { data } = await this.client.get('/condition/categories', { params });
    return data;
  }
}
