import { readFile } from 'fs/promises';
import { ArcAbstractAPI, ArcAPIOptions } from '../abstract-api';
import FormData from 'form-data';
import { MigrateBatchResponse } from './types';

export class ArcSales extends ArcAbstractAPI {
  constructor(options: ArcAPIOptions) {
    super({ ...options, apiPath: 'sales/api/v1' });
  }

  async migrate(filePath: string) {
    const form = new FormData();
    const file = await readFile(filePath);
    form.append('file', file, { filename: 'subs.json' });

    const { data } = await this.client.post<MigrateBatchResponse>('/migrate', form, {
      headers: { ...form.getHeaders() },
    });

    return data;
  }
}
