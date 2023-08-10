# @mattbrannon/convert

## 2.2.0

### Minor Changes

- Adds support for XYZ and LAB color spaces.

## 2.1.0

### Minor Changes

- Added an identity function in each angle converter. Changed the build process to include separate esm and cjs inputs. Now instead of a single index.ts file exporting everything, there is an index.esm.ts and an index.cjs.ts.

## 2.0.1

### Patch Changes

- Fix esm import errors. Package should now actually support both ESM and CJS. Unlike before when we said we did but really we didn't. Let's hope anyways.

## 2.0.0

### Major Changes

- Removed default export in favor of named exports only.

## 1.0.2

### Patch Changes

- Add MIT License

## 1.0.1

### Patch Changes

- 0c5c863: In the previous version, when converting between HSV, HWB, and HSL color spaces, each color space would be converted to RGB as an intermediate step. This causes problems as we lose any information about the hue when the saturation is 0. This version ensures that when an intermediate step is used, the hue is retained throughout from start to finish.
