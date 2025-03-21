import encode from 'base32-encode';
import { v5 as uuidv5 } from 'uuid';

export const generateArcId = (identifier: string, orgHostname: string) => {
  const namespace = uuidv5(orgHostname, uuidv5.DNS);
  const buffer = uuidv5(identifier, namespace, Buffer.alloc(16));
  return encode(buffer, 'RFC4648', { padding: false });
};

/**
 * Utility class for generating Arc IDs and source IDs
 *
 * @example
 * ```ts
 * const generator = new IdGenerator(['my-org']);
 * const arcId = generator.getArcId('123'); // Generates a unique for 'my-org' Arc ID
 * const sourceId = generator.getSourceId('123', ['my-site']); // Generates 'my-site-123'
 * ```
 */
export class IdGenerator {
  private namespace: string;

  constructor(namespaces: string[]) {
    if (!namespaces.length) {
      throw new Error('At least 1 namespace is required');
    }

    this.namespace = namespaces.join('-');
  }

  getArcId(id: number | string) {
    return generateArcId(id.toString(), this.namespace);
  }

  getSourceId(id: number | string, prefixes: string[] = []) {
    return [...prefixes, id].join('-');
  }
}
