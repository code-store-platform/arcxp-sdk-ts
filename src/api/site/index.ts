import { Section, SetSection } from '../../types/section';
import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import { GetSectionsResponse, Website } from './types';

export class ArcSite extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'site/v3' });
  }

  async getSections(website: string, offset?: number) {
    const { data } = await this.client.get<GetSectionsResponse>(`/website/${website}/section`, {
      params: { _website: website, offset },
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

  async putSection(section: SetSection) {
    const { data } = await this.client.put(`/website/${section.website}/section?_id=${section._id}`, section);

    return data;
  }

  async getWebsites() {
    const { data } = await this.client.get<Website[]>('/website');

    return data;
  }
}
