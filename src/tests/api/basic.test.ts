import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ArcAPI } from '../../api';

describe('Arc API', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  test('Should throw authorization error (Invalid token)', async () => {
    const API = ArcAPI({ credentials: { organizationName: 'codestore', accessToken: Date.now().toString() } });

    await expect(API.Draft.generateId(Date.now().toString())).rejects.toMatchObject({
      name: 'ArcDraftError',
      message: 'Request failed with status code 401',
      service: 'ArcDraft',
      responseStatus: 401,
    });
  });
});
