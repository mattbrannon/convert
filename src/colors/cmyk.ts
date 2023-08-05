import {
  rgbToHsl,
  rgbToHex,
  rgbToHwb,
  rgbToHsv,
  rgbToLch,
  rgbToXyz,
} from './rgb';
import { xyzToLab } from './xyz';
import { pipe } from '../utils';

function cmykToRgb(...cmyk: number[]) {
  cmyk = cmyk.flat();
  const k = Number(cmyk.slice(-1));
  return cmyk
    .map((n) => {
      const value = Math.round(
        255 * (1 - ((n / 100) * (1 - k / 100) + k / 100))
      );
      return isNaN(value) ? 0 : value;
    })
    .slice(0, 3);
}

function cmykToHex(...cmyk: number[]): string {
  return pipe(cmykToRgb, rgbToHex)(cmyk.flat());
}

function cmykToHsl(...cmyk: number[]): number[] {
  return pipe(cmykToRgb, rgbToHsl)(cmyk.flat());
}

function cmykToHsv(...cmyk: number[]): number[] {
  return pipe(cmykToRgb, rgbToHsv)(cmyk.flat());
}

function cmykToHwb(...cmyk: number[]): number[] {
  return pipe(cmykToRgb, rgbToHwb)(cmyk.flat());
}

function cmykToLch(...cmyk: number[]): number[] {
  return pipe(cmykToRgb, rgbToLch)(cmyk.flat());
}

function cmykToXyz(...cmyk: number[]): number[] {
  return pipe(cmykToRgb, rgbToXyz)(cmyk.flat());
}

function cmykToLab(...cmyk: number[]): number[] {
  return pipe(cmykToXyz, xyzToLab)(cmyk.flat());
}

export const cmyk = {
  rgb: (...cmyk: (number | number[])[]) => cmykToRgb(...cmyk.flat()),
  hsl: (...cmyk: (number | number[])[]) => cmykToHsl(...cmyk.flat()),
  hwb: (...cmyk: (number | number[])[]) => cmykToHwb(...cmyk.flat()),
  hsv: (...cmyk: (number | number[])[]) => cmykToHsv(...cmyk.flat()),
  hex: (...cmyk: (number | number[])[]) => cmykToHex(...cmyk.flat()),
  lch: (...cmyk: (number | number[])[]) => cmykToLch(...cmyk.flat()),
  xyz: (...cmyk: (number | number[])[]) => cmykToXyz(...cmyk.flat()),
  lab: (...cmyk: (number | number[])[]) => cmykToLab(...cmyk.flat()),
};
