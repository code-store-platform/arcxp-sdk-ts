import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import autoExternal from 'rollup-plugin-auto-external';

export default [
  // 📦 CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    plugins: [
      json(),
      resolve({ preferBuiltins: true }),
      commonjs(),
      typescript({
        declaration: false,
      }),
      autoExternal(),
    ],
  },

  // 📦 ES Module build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
    plugins: [
      json(),
      resolve({ preferBuiltins: true, browser: false }),
      commonjs(),
      typescript({
        declaration: true,
      }),
      autoExternal(),
    ],
  },
];
