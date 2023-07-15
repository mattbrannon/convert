/* eslint-disable prefer-const */

import { pipe } from '../utils';
import { rgbToHsl, rgbToHex, rgbToHwb, rgbToHsv, rgbToCmyk } from './rgb';

function lchToRgb(...lch: number[]): number[] {
  lch = lch.flat();
  let [ l, c, h ] = lch;
  h = h * (Math.PI / 180);

  const A = c * Math.cos(h);
  const B = c * Math.sin(h);

  // Convert LAB to XYZ
  const xn = 0.95047;
  const yn = 1.0;
  const zn = 1.08883;
  const fy = (l + 16) / 116;
  const fx = A / 500 + fy;
  const fz = fy - B / 200;
  let x = fx > 0.206893 ? fx ** 3 : (fx - 16 / 116) / 7.787;
  let y = fy > 0.206893 ? fy ** 3 : (fy - 16 / 116) / 7.787;
  let z = fz > 0.206893 ? fz ** 3 : (fz - 16 / 116) / 7.787;
  x *= xn;
  y *= yn;
  z *= zn;

  // Convert XYZ to RGB
  let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let b = x * 0.0557 + y * -0.204 + z * 1.057;

  // Gamma correction
  r = r > 0.0031308 ? 1.055 * r ** (1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * g ** (1 / 2.4) - 0.055 : 12.92 * g;
  b = b > 0.0031308 ? 1.055 * b ** (1 / 2.4) - 0.055 : 12.92 * b;

  // Clamp values
  r = Math.max(0, Math.min(r, 1));
  g = Math.max(0, Math.min(g, 1));
  b = Math.max(0, Math.min(b, 1));

  // Scale values to [0, 255] and return RGB values
  const red = Math.round(r * 255);
  const green = Math.round(g * 255);
  const blue = Math.round(b * 255);
  return [ red, green, blue ];
}

function lchToHsl(...lch: number[]): number[] {
  lch = lch.flat();
  return pipe(lchToRgb, rgbToHsl)(lch);
}

function lchToHex(...lch: number[]): string {
  lch = lch.flat();
  return pipe(lchToRgb, rgbToHex)(lch);
}

function lchToHwb(...lch: number[]): number[] {
  lch = lch.flat();
  return pipe(lchToRgb, rgbToHwb)(lch);
}

function lchToHsv(...lch: number[]): number[] {
  lch = lch.flat();
  return pipe(lchToRgb, rgbToHsv)(lch);
}
function lchToCmyk(...lch: number[]): number[] {
  lch = lch.flat();
  return pipe(lchToRgb, rgbToCmyk)(lch);
}

export const lch = {
  rgb: (...lch: (number | number[])[]) => lchToRgb(...lch.flat()),
  hex: (...lch: (number | number[])[]) => lchToHex(...lch.flat()),
  hsl: (...lch: (number | number[])[]) => lchToHsl(...lch.flat()),
  hwb: (...lch: (number | number[])[]) => lchToHwb(...lch.flat()),
  hsv: (...lch: (number | number[])[]) => lchToHsv(...lch.flat()),
  cmyk: (...lch: (number | number[])[]) => lchToCmyk(...lch.flat()),
};
