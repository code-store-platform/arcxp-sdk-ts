import encode from 'base32-encode';
import { v5 as uuidv5 } from 'uuid';

export const generateArcId = (identifier: string, orgHostname: string) => {
  const namespace = uuidv5(orgHostname, uuidv5.DNS);
  const buffer = uuidv5(identifier, namespace, Buffer.alloc(16));
  return encode(buffer, 'RFC4648', { padding: false });
};
