/* eslint-disable prefer-const */

import { pipe } from '../utils';
import { rgbToHex, rgbToCmyk, rgbToLch, rgbToXyz } from './rgb';
import { xyzToLab } from './xyz';

export function hsvToRgb(...hsv: number[]): number[] {
  hsv = hsv.flat();
  let r: number = 0;
  let g: number = 0;
  let b: number = 0;
  const [ h, s, v, a ] = hsv.map((n, i) => {
    const value = i === 0 ? n / 360 : i < 3 ? n / 100 : n;
    return value;
  });

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: {
      (r = v), (g = t), (b = p);
      break;
    }
    case 1: {
      (r = q), (g = v), (b = p);
      break;
    }
    case 2: {
      (r = p), (g = v), (b = t);
      break;
    }
    case 3: {
      (r = p), (g = q), (b = v);
      break;
    }
    case 4: {
      (r = t), (g = p), (b = v);
      break;
    }
    case 5: {
      (r = v), (g = p), (b = q);
      break;
    }
  }

  r = Math.max(0, Math.min(Math.round(r * 255), 255));
  g = Math.max(0, Math.min(Math.round(g * 255), 255));
  b = Math.max(0, Math.min(Math.round(b * 255), 255));
  return a ? [ r, g, b, a ] : [ r, g, b ];
}

export function hsvToHex(...hsv: number[]): string {
  return pipe(hsvToRgb, rgbToHex)(hsv.flat());
}

export function hsvToHsl(...hsv: number[]): number[] {
  hsv = hsv.flat(Infinity);
  let [ h, s, v ] = hsv.map((n, i) => (i > 0 && n >= 1 ? n / 100 : n));
  const l = v - (v * s) / 2;
  const m = Math.min(l, 1 - l);
  s = m ? (v - l) / m : 0;
  const hue = h;
  const saturation = Math.min(Math.max(0, Math.round(s * 100)), 100);
  const lightness = Math.min(Math.max(0, Math.round(l * 100)), 100);
  return [ hue, saturation, lightness ];
}

export function hsvToCmyk(...hsv: number[]): number[] {
  return pipe(hsvToRgb, rgbToCmyk)(hsv.flat());
}

export function hsvToHwb(...hsv: number[]): number[] {
  hsv = hsv.flat();
  const [ h, s, v ] = hsv.map((n, i) => {
    return i === 0 ? n : n > 1 && i > 0 ? n / 100 : n;
  });
  const w = (1 - s) * v;
  const b = 1 - v;
  return [ h, Math.round(w * 100), Math.round(b * 100) ];
}

export function hsvToLch(...hsv: number[]): number[] {
  return pipe(hsvToRgb, rgbToLch)(hsv.flat());
}

function hsvToXyz(...hsv: number[]): number[] {
  return pipe(hsvToRgb, rgbToXyz)(hsv.flat());
}

function hsvToLab(...hsv: number[]): number[] {
  return pipe(hsvToRgb, rgbToXyz, xyzToLab)(hsv.flat());
}

export const hsv = {
  rgb: (...hsv: (number | number[])[]) => hsvToRgb(...hsv.flat()),
  hsl: (...hsv: (number | number[])[]) => hsvToHsl(...hsv.flat()),
  hwb: (...hsv: (number | number[])[]) => hsvToHwb(...hsv.flat()),
  hex: (...hsv: (number | number[])[]) => hsvToHex(...hsv.flat()),
  cmyk: (...hsv: (number | number[])[]) => hsvToCmyk(...hsv.flat()),
  lch: (...hsv: (number | number[])[]) => hsvToLch(...hsv.flat()),
  xyz: (...hsv: (number | number[])[]) => hsvToXyz(...hsv.flat()),
  lab: (...hsv: (number | number[])[]) => hsvToLab(...hsv.flat()),
};
