import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [
  {
    plugins: [ commonjs(), resolve(), terser() ],
    input: 'compiled/index.js',
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        preserveModules: true,
      },
      {
        exports: 'named',
        file: 'dist/cjs/index.js',
        format: 'cjs',
      },
    ],
  },
];
