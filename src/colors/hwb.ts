/* eslint-disable prefer-const */

import { pipe } from '../utils';
import { rgbToHsl, rgbToHex, rgbToCmyk, rgbToLch } from './rgb';

function hwbToRgb(...hwb: number[]): number[] {
  hwb = hwb.flat();
  let [ h, w, b ] = hwb.map((n, i) => {
    return i === 0 ? (n / 360) * 6 : n / 100;
  });

  let v = 1 - b;
  let n;
  if (!h) {
    return [ Math.round(v * 255), Math.round(v * 255), Math.round(v * 255) ];
  }
  else {
    const i = h | 0;
    const f = i & 1 ? 1 - (h - i) : h - i;

    n = w + f * (v - w);
    v = (v * 255) | 0;
    n = (n * 255) | 0;
    w = (w * 255) | 0;

    switch (i) {
      case 6:
      case 0:
        return [ v, n, w ];
      case 1:
        return [ n, v, w ];
      case 2:
        return [ w, v, n ];
      case 3:
        return [ w, n, v ];
      case 4:
        return [ n, w, v ];
      case 5:
        return [ v, w, n ];
      default:
        return [ 0, 0, 0 ];
    }
  }
}

function hwbToHsv(...hwb: number[]): number[] {
  hwb = hwb.flat();
  let [ h, w, b ] = hwb.map((n, i) => {
    return i === 0 ? n : i > 0 && n >= 1 ? n / 100 : n;
  });

  const d = Math.max(w + b - 1, 0) / 2;
  w -= d;
  b -= d;

  const v = 1 - b;
  const s = Math.max(1 - w / (1 - b), 0);
  return [ h, Math.round(s * 100), Math.round(v * 100) ];
}

function hwbToHex(...hwb: number[]): string {
  hwb = hwb.flat();
  return pipe(hwbToRgb, rgbToHex)(hwb);
}

function hwbToHsl(...hwb: number[]): number[] {
  hwb = hwb.flat();
  return pipe(hwbToRgb, rgbToHsl)(hwb);
}

function hwbToCmyk(...hwb: number[]): number[] {
  hwb = hwb.flat();
  return pipe(hwbToRgb, rgbToCmyk)(hwb);
}

function hwbToLch(...hwb: number[]): number[] {
  hwb = hwb.flat();
  return pipe(hwbToRgb, rgbToLch)(hwb);
}

/// ////////////////////////

export const hwb = {
  rgb: (...hwb: number[]) => hwbToRgb(...hwb),
  hex: (...hwb: number[]) => hwbToHex(...hwb),
  hsl: (...hwb: number[]) => hwbToHsl(...hwb),
  hsv: (...hwb: number[]) => hwbToHsv(...hwb),
  cmyk: (...hwb: number[]) => hwbToCmyk(...hwb),
  lch: (...hwb: number[]) => hwbToLch(...hwb),
};
