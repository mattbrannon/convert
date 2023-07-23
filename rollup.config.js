import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

import pkg from './package.json';

export default [
  {
    plugins: [ commonjs(), resolve(), terser() ],
    input: 'compiled/index.esm.js',
    output: [
      {
        format: 'esm',
        file: pkg.exports.import,
      },
    ],
  },
  {
    plugins: [ commonjs(), resolve(), terser() ],
    input: 'compiled/index.cjs.js',
    output: [
      {
        format: 'cjs',
        file: pkg.exports.require,
      },
      {
        format: 'umd',
        name: 'convert',
        file: pkg.exports.default,
      },
    ],
  },
];
