import { toFloat, pipe, keepHueInRange } from '../utils';
import { xyzToLab } from './xyz';
import { labToLch } from './lab';

export function rgbToCmyk(...rgb: number[]): number[] {
  rgb = rgb.flat();
  const [ r, g, b ] = rgb.map((n) => n / 255);
  const k = 1 - Math.max(r, g, b);
  const [ c, m, y ] = [ r, g, b ].map((n) => {
    const value = Math.round(((1 - n - k) / (1 - k)) * 100);
    return isNaN(value) ? 0 : value;
  });
  return [ c, m, y, Math.round(k * 100) ];
}

export function rgbToHex(...rgb: number[]): string {
  rgb = rgb.flat();
  const [ r, g, b ] = rgb
    .map((val) => val.toString(16))
    .map((s) => s.padStart(2, '0'));
  const alpha = rgb[3];

  if (alpha) {
    const a = Math.round(Math.min(Math.max(0, alpha), 1) * 255).toString(16);
    return `#${r}${g}${b}${a}`;
  }
  return `#${r}${g}${b}`;
}

export function rgbToHsl(...rgb: number[]): number[] {
  rgb = rgb.flat();
  const [ r, g, b, a ] = rgb.map((n, i) => {
    const value = i < 3 ? n / 255 : n;
    return value;
  });
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: {
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      }
      case g: {
        h = (b - r) / d + 2;
        break;
      }
      case b: {
        h = (r - g) / d + 4;
        break;
      }
    }
  }

  h /= 6.0;

  h = Math.round(toFloat(h * 360));
  s = Math.round(toFloat(s * 100));
  l = Math.round(toFloat(l * 100));

  return a ? [ h, s, l, a ] : [ h, s, l ];
}

export function rgbToHsv(...rgb: number[]): number[] {
  rgb = rgb.flat();
  const [ r, g, b ] = rgb.map((n) => (n /= 255));
  const a = rgb[3];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h: number = 0;
  let s: number = 0;
  let v = max;

  if (max !== min) {
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    switch (max) {
      case r: {
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      }
      case g: {
        h = (b - r) / d + 2;
        break;
      }
      case b: {
        h = (r - g) / d + 4;
        break;
      }
    }
  }

  h /= 6.0;

  h = Math.round(toFloat(h * 360));
  s = Math.round(toFloat(s * 100));
  v = Math.round(toFloat(v * 100));

  return a ? [ h, s, v, a ] : [ h, s, v ];
}

export function rgbToHwb(...rgb: number[]): number[] {
  rgb = rgb.flat();
  const [ red, green, blue ] = rgb.map((n) => n / 255);

  const w = Math.min(red, green, blue);
  const v = Math.max(red, green, blue);
  const b = 1 - v;

  if (v === w) return [ 0, Math.round(w * 100), Math.round(b * 100) ];
  const f = red === w ? green - blue : green === w ? blue - red : red - green;
  const i = red === w ? 3 : green === w ? 5 : 1;

  const hue = Math.round(((i - f / (v - w)) / 6) * 360);
  const white = Math.round(w * 100);
  const black = Math.round(b * 100);

  return [ keepHueInRange(hue), white, black ];
}

export function rgbToXyz(...rgb: number[]) {
  rgb = rgb.flat();
  const [ r, g, b ] = rgb;
  const [ r1, g1, b1 ] = [ r / 255, g / 255, b / 255 ];
  const [ r2, g2, b2 ] = [
    r1 > 0.04045 ? Math.pow((r1 + 0.055) / 1.055, 2.4) : r1 / 12.92,
    g1 > 0.04045 ? Math.pow((g1 + 0.055) / 1.055, 2.4) : g1 / 12.92,
    b1 > 0.04045 ? Math.pow((b1 + 0.055) / 1.055, 2.4) : b1 / 12.92,
  ];
  const [ x, y, z ] = [
    r2 * 0.4124 + g2 * 0.3576 + b2 * 0.1805,
    r2 * 0.2126 + g2 * 0.7152 + b2 * 0.0722,
    r2 * 0.0193 + g2 * 0.1192 + b2 * 0.9505,
  ];
  return [ x * 100, y * 100, z * 100 ];
}

function rgbToLab(...rgb: number[]) {
  return pipe(rgbToXyz, xyzToLab)(rgb.flat());
}

export function rgbToLch(...rgb: number[]) {
  return pipe(rgbToXyz, xyzToLab, labToLch)(rgb.flat());
}

export const rgb = {
  hex: (...rgb: (number | number[])[]) => rgbToHex(...rgb.flat()),
  hsl: (...rgb: (number | number[])[]) => rgbToHsl(...rgb.flat()),
  hsv: (...rgb: (number | number[])[]) => rgbToHsv(...rgb.flat()),
  hwb: (...rgb: (number | number[])[]) => rgbToHwb(...rgb.flat()),
  lch: (...rgb: (number | number[])[]) => rgbToLch(...rgb.flat()),
  cmyk: (...rgb: (number | number[])[]) => rgbToCmyk(...rgb.flat()),
  xyz: (...rgb: (number | number[])[]) => rgbToXyz(...rgb.flat()),
  lab: (...rgb: (number | number[])[]) => rgbToLab(...rgb.flat()),
};
