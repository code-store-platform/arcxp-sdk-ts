export type Distributor = {
  id: string;
  name: string;
  description: string;
  organizationId: string;
  archived: boolean;
  category: string;
  subcategory: string;
  allowAll: boolean;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  organization_id: string;
  organization: DistributorOrganization;
  contentTypes: DistributorContentType[];
  restrictions: DistributorRestriction[];
};

export type DistributorOrganization = { id: string; name: string };

export type DistributorContentType = { name: string };

export type DistributorRestriction = unknown;

export type GetDistributorsParams = Partial<{
  archived: boolean;
  order: string;
  limit: number;
  offset: number;
}>;

export type GetDistributorsResponse = {
  rows: Distributor[];
  count?: number;
};

export type CreateDistributorPayload = Partial<Omit<Distributor, 'id'>>;
