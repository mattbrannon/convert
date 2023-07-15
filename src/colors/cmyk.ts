import { rgbToHsl, rgbToHex, rgbToHwb, rgbToHsv, rgbToLch } from './rgb';
import { pipe } from '../utils';

function cmykToRgb(...cmyk: number[]) {
  cmyk = cmyk.flat();
  const k = Number(cmyk.slice(-1));
  return cmyk
    .map((n) => {
      const value = Math.round(255 * (1 - ((n / 100) * (1 - k / 100) + k / 100)));
      return isNaN(value) ? 0 : value;
    })
    .slice(0, 3);
}

function cmykToHex(...cmyk: number[]): string {
  cmyk = cmyk.flat();
  return pipe(cmykToRgb, rgbToHex)(cmyk);
}

function cmykToHsl(...cmyk: number[]): number[] {
  cmyk = cmyk.flat();
  return pipe(cmykToRgb, rgbToHsl)(cmyk);
}

function cmykToHsv(...cmyk: number[]): number[] {
  cmyk = cmyk.flat();
  return pipe(cmykToRgb, rgbToHsv)(cmyk);
}

function cmykToHwb(...cmyk: number[]): number[] {
  cmyk = cmyk.flat();
  return pipe(cmykToRgb, rgbToHwb)(cmyk);
}

function cmykToLch(...cmyk: number[]): number[] {
  cmyk = cmyk.flat();
  return pipe(cmykToRgb, rgbToLch)(cmyk);
}

export const cmyk = {
  rgb: (...cmyk: (number | number[])[]) => cmykToRgb(...cmyk.flat()),
  hsl: (...cmyk: (number | number[])[]) => cmykToHsl(...cmyk.flat()),
  hwb: (...cmyk: (number | number[])[]) => cmykToHwb(...cmyk.flat()),
  hsv: (...cmyk: (number | number[])[]) => cmykToHsv(...cmyk.flat()),
  hex: (...cmyk: (number | number[])[]) => cmykToHex(...cmyk.flat()),
  lch: (...cmyk: (number | number[])[]) => cmykToLch(...cmyk.flat()),
};
