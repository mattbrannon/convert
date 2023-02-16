# @mattbrannon/convert

## 2.0.0

### Major Changes

- Removed default export in favor of named exports only.

## 1.0.2

### Patch Changes

- Add MIT License

## 1.0.1

### Patch Changes

- 0c5c863: In the previous version, when converting between HSV, HWB, and HSL color spaces, each color space would be converted to RGB as an intermediate step. This causes problems as we lose any information about the hue when the saturation is 0. This version ensures that when an intermediate step is used, the hue is retained throughout from start to finish.
