import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ArcAPI } from '../../api';

describe('Arc API', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  test('should throw error (Invalid token)', async () => {
    const Arc = ArcAPI({ credentials: { organizationName: 'codestore', accessToken: Date.now().toString() } });

    await expect(Arc.api.Draft.generateId(Date.now().toString())).rejects.toThrowError(
      'Request failed with status code 401'
    );
  });
});
