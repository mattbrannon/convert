import { toFloat } from '../utils';

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
  const [ r, g, b ] = rgb.map((val) => val.toString(16)).map((s) => s.padStart(2, '0'));
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

  return [ hue, white, black ];
}

export function rgbToLch(...rgb: number[]): number[] {
  rgb = rgb.flat();
  let [ r, g, b ] = rgb.map((c) => c / 255);

  // Gamma correction
  r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
  g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
  b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;

  // Convert RGB to XYZ
  const x = 0.4124 * r + 0.3576 * g + 0.1805 * b;
  const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const z = 0.0193 * r + 0.1192 * g + 0.9505 * b;

  // Convert XYZ to LAB
  const xn = 0.95047;
  const yn = 1.0;
  const zn = 1.08883;
  let fx = x / xn;
  let fy = y / yn;
  let fz = z / zn;
  fx = fx > 0.008856 ? fx ** (1 / 3) : 7.787 * fx + 16 / 116;
  fy = fy > 0.008856 ? fy ** (1 / 3) : 7.787 * fy + 16 / 116;
  fz = fz > 0.008856 ? fz ** (1 / 3) : 7.787 * fz + 16 / 116;

  const L = 116 * fy - 16;
  const A = 500 * (fx - fy);
  const B = 200 * (fy - fz);

  // Convert LAB to LCH
  const C = Math.sqrt(A ** 2 + B ** 2);
  const H = Math.atan2(B, A) * (180 / Math.PI);

  return [ L, C, H ];
}

export const rgb = {
  hex: (...rgb: (number | number[])[]) => rgbToHex(...rgb.flat()),
  hsl: (...rgb: (number | number[])[]) => rgbToHsl(...rgb.flat()),
  hsv: (...rgb: (number | number[])[]) => rgbToHsv(...rgb.flat()),
  hwb: (...rgb: (number | number[])[]) => rgbToHwb(...rgb.flat()),
  lch: (...rgb: (number | number[])[]) => rgbToLch(...rgb.flat()),
  cmyk: (...rgb: (number | number[])[]) => rgbToCmyk(...rgb.flat()),
};
