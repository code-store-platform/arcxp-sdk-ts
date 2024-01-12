import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ArcUtils } from '../../utils/arc';

describe('Arc Utils', () => {
  const namespace = `${Date.now()}`;

  beforeEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  describe('ArcUtils.common.generateArcId', () => {
    test('Should have 26 characters', () => {
      const id = ArcUtils.common.generateArcId('1', namespace);

      expect(id).toHaveLength(26);
    });

    test('Same identifiers and namespaces', () => {
      const id1 = ArcUtils.common.generateArcId('1', namespace);
      const id2 = ArcUtils.common.generateArcId('1', namespace);

      expect(id1).toEqual(id2);
    });

    test('Different identifiers', () => {
      const id1 = ArcUtils.common.generateArcId('1', namespace);
      const id2 = ArcUtils.common.generateArcId('2', namespace);

      expect(id1).not.toEqual(id2);
    });

    test('Different namespaces', () => {
      const id1 = ArcUtils.common.generateArcId('1', namespace);
      const id2 = ArcUtils.common.generateArcId('1', namespace + '1');

      expect(id1).not.toEqual(id2);
    });
  });
});
