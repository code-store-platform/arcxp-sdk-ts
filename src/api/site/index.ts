import { ArcAbstractAPI, type ArcAPIOptions } from '../abstract-api.js';
import type {
  GetLinksParams,
  GetLinksResponse,
  GetSectionParams,
  GetSectionsResponse,
  Link,
  Section,
  SetSectionPayload,
  Website,
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
    const { data } = await this.client.get<Section>(`/website/${website}/section?_id=${id}`);

    return data;
  }

  async deleteSection(id: string, website: string) {
    await this.client.delete(`/website/${website}/section?_id=${id}`);
  }

  async putSection(section: SetSectionPayload) {
    const { data } = await this.client.put(`/website/${section.website}/section?_id=${section._id}`, section);

    return data;
  }

  async getWebsites() {
    const { data } = await this.client.get<Website[]>('/website');

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
}
