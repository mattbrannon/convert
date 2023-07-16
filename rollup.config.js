import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

import pkg from './package.json';

export default [
  {
    plugins: [ commonjs(), resolve(), terser() ],
    input: 'compiled/index.js',
    output: [
      {
        format: 'esm',
        file: pkg.exports.import,
      },
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
