import { writeFileSync } from 'node:fs';
import { compileFromFile } from 'json-schema-to-typescript';

const input = './ans-schema.json';
const output = './src/types/ans-types.ts';

compileFromFile(input).then((ts) => writeFileSync(output, ts));
