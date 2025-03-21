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
      provider: 'v8', // or 'v8'
    },
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
  },
});
