import { pipe } from '../utils';
import { rgbToHsl, rgbToHex, rgbToCmyk, rgbToLch } from './rgb';
function hsvToRgb(...hsv: number[]): number[] {
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

function hsvToHex(...hsv: number[]): string {
  hsv = hsv.flat();
  return pipe(hsvToRgb, rgbToHex)(hsv);
}

function hsvToHsl(...hsv: number[]): number[] {
  hsv = hsv.flat();
  return pipe(hsvToRgb, rgbToHsl)(hsv);
}

function hsvToCmyk(...hsv: number[]): number[] {
  hsv = hsv.flat();
  return pipe(hsvToRgb, rgbToCmyk)(hsv);
}

function hsvToHwb(...hsv: number[]): number[] {
  hsv = hsv.flat();
  const [ h, s, v ] = hsv.map((n, i) => {
    return i === 0 ? n : n > 1 && i > 0 ? n / 100 : n;
  });
  const w = (1 - s) * v;
  const b = 1 - v;
  return [ h, Math.round(w * 100), Math.round(b * 100) ];
}

function hsvToLch(...hsv: number[]): number[] {
  hsv = hsv.flat();
  return pipe(hsvToRgb, rgbToLch)(hsv);
}

export const hsv = {
  rgb: (...hsv: number[]) => hsvToRgb(...hsv),
  hsl: (...hsv: number[]) => hsvToHsl(...hsv),
  hwb: (...hsv: number[]) => hsvToHwb(...hsv), // ,
  hex: (...hsv: number[]) => hsvToHex(...hsv),
  cmyk: (...hsv: number[]) => hsvToCmyk(...hsv),
  lch: (...hsv: number[]) => hsvToLch(...hsv),
};
