import { ArcAbstractAPI, type ArcAPIOptions } from '../abstract-api.js';
import type {
  GetLinksParams,
  GetLinksResponse,
  GetNavigationParams,
  GetSectionParams,
  GetSectionsResponse,
  Hierarchy,
  Link,
  NavigationNode,
  Section,
  SetSectionPayload,
  Website,
  WebsiteGroup,
} from './types.js';

export class ArcSite extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'site/v3' });
  }

  async getSections(params: GetSectionParams) {
    const { data } = await this.client.get<GetSectionsResponse>(`/website/${params.website}/section`, {
      params: { _website: params.website, ...params },
    });

    return data;
  }

  async getSection(id: string, website: string) {
    const { data } = await this.client.get<Section>(`/website/${website}/section?_id=${encodeURIComponent(id)}`);

    return data;
  }

  async deleteSection(id: string, website: string) {
    await this.client.delete(`/website/${website}/section?_id=${encodeURIComponent(id)}`);
  }

  async putSection(section: SetSectionPayload) {
    const { data } = await this.client.put(
      `/website/${section.website}/section?_id=${encodeURIComponent(section._id)}`,
      section
    );

    return data;
  }

  async getWebsites() {
    const { data } = await this.client.get<Website[]>('/website');

    return data;
  }

  async getWebsite(website: string) {
    const { data } = await this.client.get<Website>(`/website/${website}`);

    return data;
  }

  /**
   * Makes `website` the organization default and removes the flag from the
   * previous default. Not in the public Site Service spec: Arc XP Support
   * provides it for default-website migrations.
   */
  async setDefaultWebsite(website: string) {
    const { data } = await this.client.put(`/website/${website}/set-default`);

    return data;
  }

  async putWebsite(website: Website) {
    const { data } = await this.client.put<Website>(`/website/${website._id}`, website);

    return data;
  }

  async deleteWebsite(website: string) {
    const { data } = await this.client.delete<Website>(`/website/${website}`);

    return data;
  }

  async putLink(link: Link) {
    const { data } = await this.client.put<Link>(`/website/${link._website}/link/${link._id}`, link);

    return data;
  }

  async deleteLink(id: string, website: string) {
    const { data } = await this.client.delete(`/website/${website}/link/${id}`);

    return data;
  }

  async getLinks(params: GetLinksParams) {
    const { data } = await this.client.get<GetLinksResponse>(`/website/${params.website}/link`, { params });

    return data;
  }

  /** Every hierarchy in the organization. */
  async getHierarchies() {
    const { data } = await this.client.get<Hierarchy[]>('/hierarchy');

    return data;
  }

  async getHierarchy(id: string) {
    const { data } = await this.client.get<Hierarchy>(`/hierarchy/${id}`);

    return data;
  }

  /** The hierarchies that `website` has. One hierarchy can belong to several websites. */
  async getWebsiteHierarchies(website: string) {
    const { data } = await this.client.get<Hierarchy[]>(`/website/${website}/hierarchies`);

    return data;
  }

  async putHierarchy(hierarchy: Hierarchy) {
    const { data } = await this.client.put<Hierarchy>(`/hierarchy/${hierarchy._id}`, hierarchy);

    return data;
  }

  /** Deletes the hierarchy for every website that has it. `default` cannot be deleted. */
  async deleteHierarchy(id: string) {
    const { data } = await this.client.delete(`/hierarchy/${id}`);

    return data;
  }

  async getWebsiteGroups() {
    const { data } = await this.client.get<WebsiteGroup[]>('/website-group');

    return data;
  }

  async getWebsiteGroup(id: string) {
    const { data } = await this.client.get<WebsiteGroup>(`/website-group/${id}`);

    return data;
  }

  async addWebsiteToGroup(groupId: string, website: string) {
    const { data } = await this.client.put(`/website-group/${groupId}/website`, { _id: groupId, _website: website });

    return data;
  }

  async removeWebsiteFromGroup(groupId: string, website: string) {
    const { data } = await this.client.delete(`/website-group/${groupId}/website/${website}`);

    return data;
  }

  async getNavigation(website: string, params?: GetNavigationParams) {
    const { data } = await this.client.get<NavigationNode>(`/navigation/${website}`, { params });

    return data;
  }
}
