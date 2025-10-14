import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createAPI(mod: typeof import('../../dist/index.js')) {
  const api = mod.ArcAPI({ credentials: { accessToken: '', organizationName: '' } });
  return api;
}

describe('Module import', () => {
  it('CJS', async () => {
    const mod = await import(path.resolve(__dirname, '../../dist/index.cjs'));
    expect(mod).toBeDefined();
    expect(typeof mod.ArcAPI).toBe('function');
    expect(createAPI(mod)).toBeTypeOf('object');
  });

  it('ESM', async () => {
    const mod = await import(path.resolve(__dirname, '../../dist/index.js'));
    expect(mod).toBeDefined();
    expect(typeof mod.ArcAPI).toBe('function');
    expect(createAPI(mod)).toBeTypeOf('object');
  });
});
