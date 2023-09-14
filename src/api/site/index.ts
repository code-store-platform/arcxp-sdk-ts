import { Section, SetSection } from '../../types/section';
import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';

export class ArcSite extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'site/v3' });
  }

  async getSection(id: string, website: string) {
    const { data } = await this.client.get<Section>(`/website/${website}/section?_id=${id}`);

    return data;
  }

  async putSection(section: SetSection) {
    const { data } = await this.client.put(`/website/${section.website}/section?_id=${section._id}`, section);

    return data;
  }
}
