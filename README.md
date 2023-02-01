# @mattbrannon/convert

This is a collection of functions for converting one thing to another. Currently those things are colors and angles.
Color formats currently include:

- rgb
- hsl
- hex
- hsv
- hwb
- cmyk
- lch

Angle formats currently include:

- degree
- radian
- gradian
- turn

## Installation

This package is available on Npm. You can install it using the package manager of your choice.

```bash
npm i --save @mattbrannon/convert
```

This package is compatible with both ESM (ES Modules) and CJS (Common JS).

## Usage

Color conversion functions can be called in one of two ways.

- Pass an array of values representing the individual color channels
- Pass each color channel individually as an argument.

The exception to the rule is for hexadecimal conversions which always require a string

```js
import { rgb, hex } from '@mattbrannon/convert';

// these are functionally equivalent to each other

rgb.lch([255, 0, 255]); // array of values
rgb.lch(255, 0, 255); // individual values

hex.hsl('#ff00ff');
```
