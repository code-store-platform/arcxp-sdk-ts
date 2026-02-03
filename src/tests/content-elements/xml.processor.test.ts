import { readdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import XmlDocument from 'xmldoc';
import { ContentElement } from '../../content-elements/content-elements';
import { XMLProcessor } from '../../content-elements/xml';
import { isXmlElement } from '../../content-elements/xml/xml.utils';

const fixturesDir = path.join(__dirname, '../__fixtures__/xml-processor');
const fixtures = readdirSync(fixturesDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace('.json', ''));

class EnhancedXMLProcessor extends XMLProcessor {
  init() {
    super.init();
    this.handle('custom_element', (node) => {
      if (isXmlElement(node) && node.name === 'custom_element') {
        return [ContentElement.twitter('1234567890')];
      }
    });
  }
}

describe('XMLProcessor', () => {
  for (const fixtureName of fixtures) {
    test(`fixture: ${fixtureName}`, async () => {
      const { output, expected } = await getFixture(fixtureName);

      expect(output).toBeDefined();
      expect(output).toMatchObject(expected);
    });
  }
});

async function getFixture(fixtureName: string) {
  const body = await readFile(path.join(fixturesDir, `${fixtureName}.xml`), 'utf-8');
  const expected = await readFile(path.join(fixturesDir, `${fixtureName}.json`), 'utf-8');
  const compressed = new XmlDocument(body).toString({ compressed: true }); // remove whitespace from fixture xml
  const processor = new EnhancedXMLProcessor();
  processor.init();
  const output = await processor.parse(compressed);

  return {
    output,
    expected: JSON.parse(expected),
  };
}
