import {
  rgbToHsl,
  rgbToHwb,
  rgbToHsv,
  rgbToCmyk,
  rgbToLch,
  rgbToXyz,
} from './rgb';
import { xyzToLab } from './xyz';
import { pipe, removeHash, makeLong, toFloat } from '../utils';

function hexToRgb(hex: string): number[] {
  const str = removeHash(makeLong(hex));
  const r = parseInt(str.substring(0, 2), 16);
  const g = parseInt(str.substring(2, 4), 16);
  const b = parseInt(str.substring(4, 6), 16);
  const a = toFloat(parseInt(str.substring(6, 8), 16) / 255);

  return isNaN(a) ? [ r, g, b ] : [ r, g, b, a ];
}

function hexToHsl(hex: string): number[] {
  return pipe(hexToRgb, rgbToHsl)(hex);
}

function hexToHsv(hex: string): number[] {
  return pipe(hexToRgb, rgbToHsv)(hex);
}

function hexToCmyk(hex: string): number[] {
  return pipe(hexToRgb, rgbToCmyk)(hex);
}

function hexToHwb(hex: string): number[] {
  return pipe(hexToRgb, rgbToHwb)(hex);
}

function hexToLch(hex: string): number[] {
  return pipe(hexToRgb, rgbToLch)(hex);
}

function hexToXyz(hex: string): number[] {
  return pipe(hexToRgb, rgbToXyz)(hex);
}

function hexToLab(hex: string): number[] {
  return pipe(hexToRgb, rgbToXyz, xyzToLab)(hex);
}

export const hex = {
  rgb: (hex: string) => hexToRgb(hex),
  hsl: (hex: string) => hexToHsl(hex),
  hwb: (hex: string) => hexToHwb(hex),
  hsv: (hex: string) => hexToHsv(hex),
  cmyk: (hex: string) => hexToCmyk(hex),
  lch: (hex: string) => hexToLch(hex),
  xyz: (hex: string) => hexToXyz(hex),
  lab: (hex: string) => hexToLab(hex),
};
