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
    return [ v, v, v ];
  }
  else {
    const i = h | 0;
    const f = i & 1 ? 1 - h - i : h - i;

    // f = h - i;
    // if (i & 1) f = 1 - f;
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

//  function hwbToHsv(...hwb: any[]) {
//   hwb = hwb.flat();
//   const [ h, w, b ] = hwb.map((n, i) => (i > 0 ? n / 100 : n));

//   const s = 1 - w / (1 - b);
//   const v = 1 - b;

//   return [ h, Math.round(s * 100), Math.round(v * 100) ];
// }

function hwbToHsv(...hwb: number[]): number[] {
  hwb = hwb.flat();
  const d = Math.abs(100 - (hwb[1] + hwb[2])) / 2;

  const [ h, w, b ] = hwb.map((n, i) => {
    return i === 0 ? n : n > 1 && i > 0 ? (n - d) / 100 : n;
  });

  const s = 1 - w / (1 - b);
  const v = 1 - b;
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

// const normalize = (value: number, index: number) =>
//   Math.round(index === 0 ? value * 360 : value * 100);

export const hwb = {
  rgb: (...hwb: number[]) => hwbToRgb(...hwb),
  hex: (...hwb: number[]) => hwbToHex(...hwb),
  hsl: (...hwb: number[]) => hwbToHsl(...hwb),
  hsv: (...hwb: number[]) => hwbToHsv(...hwb),
  cmyk: (...hwb: number[]) => hwbToCmyk(...hwb),
  lch: (...hwb: number[]) => hwbToLch(...hwb),
};
