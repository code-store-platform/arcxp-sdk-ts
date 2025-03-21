import { readdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { HTMLProcessor } from '../../content-elements/html';

const suitesDir = path.join(__dirname, '../__fixtures__/html-processor');
const suites = readdirSync(suitesDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace('.json', ''));

describe('HTMLProcessor', () => {
  for (const suite of suites) {
    test(`suite: ${suite}`, async () => {
      const { output, expected } = await getSuite(suite);

      expect(output).toBeDefined();
      expect(output).toMatchObject(expected);
    });
  }
});

async function getSuite(suite: string) {
  const body = await readFile(path.join(suitesDir, `${suite}.html`), 'utf-8');
  const expected = await readFile(path.join(suitesDir, `${suite}.json`), 'utf-8');
  const processor = new HTMLProcessor();
  processor.init();
  const output = await processor.parse(body);

  return {
    output,
    expected: JSON.parse(expected),
  };
}
