import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import pkg from './package.json';

export default [
  {
    plugins: [ commonjs(), resolve(), terser() ],
    input: 'lib/index.js',
    output: [
      {
        name: 'convert',
        file: pkg.browser,
        format: 'umd',
      },
      { file: pkg.main, format: 'cjs', exports: 'named' },
      { file: pkg.module, format: 'esm', exports: 'named' },
    ],
    treeshake: {
      preset: 'smallest',
      moduleSideEffects: false,
    },
  },
];
