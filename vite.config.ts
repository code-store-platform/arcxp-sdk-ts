// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['verbose'],
    snapshotFormat: {
      printBasicPrototype: false,
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'v8',
    },
  },
});
