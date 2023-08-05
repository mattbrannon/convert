/* eslint-disable prefer-const */
import { pipe } from '../utils';
import { hsvToHwb } from './hsv';
import { rgbToHex, rgbToCmyk, rgbToLch, rgbToXyz } from './rgb';
import { xyzToLab } from './xyz';

// Helper function
function hue2rgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgb(...hsl: number[]): number[] {
  hsl = hsl.flat();
  let r: number;
  let g: number;
  let b: number;

  const [ h, s, l, a ] = hsl.map((n, i) => {
    const value = i === 0 ? n / 360 : i < 3 ? n / 100 : n;
    return value;
  });

  if (s === 0) {
    r = g = b = l;
  }
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;

    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  r = Math.max(0, Math.min(Math.round(r * 255), 255));
  g = Math.max(0, Math.min(Math.round(g * 255), 255));
  b = Math.max(0, Math.min(Math.round(b * 255), 255));

  return a ? [ r, g, b, a ] : [ r, g, b ];
}

function hslToHex(...hsl: number[]): string {
  return pipe(hslToRgb, rgbToHex)(hsl.flat());
}

function hslToHsv(...hsl: number[]): number[] {
  let [ h, s, l ] = hsl.flat(Infinity).map((n, i) => {
    return i > 0 && n >= 1 ? n / 100 : n;
  });

  const v = s * Math.min(l, 1 - l) + l;
  s = v ? 2 - (2 * l) / v : 0;

  return [ h, Math.round(s * 100), Math.round(v * 100) ];
}

function hslToCmyk(...hsl: number[]): number[] {
  return pipe(hslToRgb, rgbToCmyk)(hsl.flat());
}

function hslToHwb(...hsl: number[]): number[] {
  return pipe(hslToHsv, hsvToHwb)(hsl.flat());
}

function hslToLch(...hsl: number[]): number[] {
  return pipe(hslToRgb, rgbToLch)(hsl.flat());
}

function hslToXyz(...hsl: number[]): number[] {
  return pipe(hslToRgb, rgbToXyz)(hsl.flat());
}

function hslToLab(...hsl: number[]): number[] {
  return pipe(hslToRgb, rgbToXyz, xyzToLab)(hsl.flat());
}

export const hsl = {
  rgb: (...hsl: (number | number[])[]) => hslToRgb(...hsl.flat()),
  hsv: (...hsl: (number | number[])[]) => hslToHsv(...hsl.flat()),
  hwb: (...hsl: (number | number[])[]) => hslToHwb(...hsl.flat()),
  hex: (...hsl: (number | number[])[]) => hslToHex(...hsl.flat()),
  cmyk: (...hsl: (number | number[])[]) => hslToCmyk(...hsl.flat()),
  lch: (...hsl: (number | number[])[]) => hslToLch(...hsl.flat()),
  xyz: (...hsl: (number | number[])[]) => hslToXyz(...hsl.flat()),
  lab: (...hsl: (number | number[])[]) => hslToLab(...hsl.flat()),
};
