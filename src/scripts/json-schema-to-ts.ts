import { writeFileSync } from 'fs';
import { compileFromFile } from 'json-schema-to-typescript';

const input = './input.json';
const output = './output.ts';

compileFromFile(input).then((ts) => writeFileSync(output, ts));
