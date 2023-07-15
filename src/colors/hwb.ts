/* eslint-disable prefer-const */

import { pipe } from '../utils';
import { hsvToRgb, hsvToHex, hsvToHsl, hsvToLch, hsvToCmyk } from './hsv';

function hwbToHsv(...hwb: number[]): number[] {
  let [ h, w, b ] = hwb.flat(Infinity).map((n, i) => (i > 0 && n >= 1 ? n / 100 : n));

  if (w + b > 1) {
    const d = (w + b - 1) / 2;
    w = w - d;
    b = b - d;
  }

  let s = 1 - w / (1 - b) || 0;
  let v = 1 - b;

  s = Math.max(0, Math.min(Math.round(s * 100), 100));
  v = Math.max(0, Math.min(Math.round(v * 100), 100));
  return [ h, s, v ];
}

function hwbToRgb(...hwb: number[]): number[] {
  hwb = hwb.flat(Infinity);
  return pipe(hwbToHsv, hsvToRgb)(hwb);
}

function hwbToHex(...hwb: number[]): string {
  hwb = hwb.flat();
  return pipe(hwbToHsv, hsvToHex)(hwb);
}

function hwbToHsl(...hwb: number[]): number[] {
  hwb = hwb.flat();
  return pipe(hwbToHsv, hsvToHsl)(hwb);
}

function hwbToCmyk(...hwb: number[]): number[] {
  hwb = hwb.flat();
  return pipe(hwbToHsv, hsvToCmyk)(hwb);
}

function hwbToLch(...hwb: number[]): number[] {
  hwb = hwb.flat();
  return pipe(hwbToHsv, hsvToLch)(hwb);
}

/// ////////////////////////

export const hwb = {
  rgb: (...hwb: (number | number[])[]) => hwbToRgb(...hwb.flat()),
  hex: (...hwb: (number | number[])[]) => hwbToHex(...hwb.flat()),
  hsl: (...hwb: (number | number[])[]) => hwbToHsl(...hwb.flat()),
  hsv: (...hwb: (number | number[])[]) => hwbToHsv(...hwb.flat()),
  cmyk: (...hwb: (number | number[])[]) => hwbToCmyk(...hwb.flat()),
  lch: (...hwb: (number | number[])[]) => hwbToLch(...hwb.flat()),
};
