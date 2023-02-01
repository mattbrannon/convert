import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import pkg from './package.json';

export default [
  {
    plugins: [ commonjs(), resolve(), terser() ],
    input: 'dist/index.js',
    output: [
      {
        dir: 'dist',
        format: 'esm',
        preserveModules: true,
      },
      {
        exports: 'named',
        file: pkg.exports.require,
        format: 'cjs',
      },
    ],
  },
];
