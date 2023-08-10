import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import pkg from './package.json';

const commonPlugins = [ resolve(), commonjs() ];

const plugins =
  process.env.NODE_ENV === 'production'
    ? [ ...commonPlugins, terser() ]
    : commonPlugins;

export default [
  {
    input: './compiled/index.js',
    output: [
      {
        file: pkg.exports['.'].require,
        format: 'cjs',
      },
      {
        file: pkg.exports['.'].default,
        format: 'umd',
        name: 'convert',
      },
    ],
    plugins,
  },
  {
    input: './compiled/index.esm.js',
    output: {
      dir: 'dist/esm',
      // file: pkg.exports['.'].import,
      format: 'esm',
      preserveModules: true,
    },
    plugins,
  },
];
