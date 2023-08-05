import { pipe } from '../utils';
import { rgbToHsl, rgbToHex, rgbToHwb, rgbToHsv, rgbToCmyk, rgbToLch } from './rgb';

export function xyzToLab(...xyz: (number | number[])[]) {
  // Define the reference white values for D65 illuminant
  xyz = xyz.flat();

  const [ X, Y, Z ] = xyz as number[];
  const Xn = 95.047;
  const Yn = 100.0;
  const Zn = 108.883;

  // Normalize XYZ values
  const XnNormalized = X / Xn;
  const YnNormalized = Y / Yn;
  const ZnNormalized = Z / Zn;

  // Non-linear transformation (CIELAB L* function)
  function f(t: number) {
    return t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116;
  }

  const L = YnNormalized > 0.008856 ? 116 * f(YnNormalized) - 16 : 903.3 * YnNormalized;
  const a = 500 * (f(XnNormalized) - f(YnNormalized));
  const b = 200 * (f(YnNormalized) - f(ZnNormalized));

  return [ L, a, b ];
}

export function xyzToRgb(...xyz: number[]) {
  xyz = xyz.flat();
  const [ x, y, z ] = xyz.map((v) => v / 100);
  let r = x * 3.240969941904521 + y * -1.537383177570093 + z * -0.498610760293;
  let g = x * -0.96924363628087 + y * 1.87596750150772 + z * 0.041555057407175;
  let b = x * 0.055630079696993 + y * -0.20397695888897 + z * 1.056971514242878;

  // Gamma correction and clamping
  const gammaCorrection = (value: number) => {
    return value > 0.0031308 ? 1.055 * Math.pow(value, 1 / 2.4) - 0.055 : 12.92 * value;
  };

  r = gammaCorrection(r);
  g = gammaCorrection(g);
  b = gammaCorrection(b);

  // Clamping the RGB values to the range [0, 255]
  r = Math.round(Math.max(0, Math.min(1, r)) * 255);
  g = Math.round(Math.max(0, Math.min(1, g)) * 255);
  b = Math.round(Math.max(0, Math.min(1, b)) * 255);

  return [ r, g, b ];
}

export function xyzToHsl(...xyz: number[]) {
  xyz = xyz.flat();
  return pipe(xyzToRgb, rgbToHsl)(xyz);
}

export function xyzToHex(...xyz: number[]) {
  xyz = xyz.flat();
  return pipe(xyzToRgb, rgbToHex)(xyz);
}

export function xyzToHwb(...xyz: number[]) {
  xyz = xyz.flat();
  return pipe(xyzToRgb, rgbToHwb)(xyz);
}

export function xyzToHsv(...xyz: number[]) {
  xyz = xyz.flat();
  return pipe(xyzToRgb, rgbToHsv)(xyz);
}

export function xyzToCmyk(...xyz: number[]) {
  xyz = xyz.flat();
  return pipe(xyzToRgb, rgbToCmyk)(xyz);
}

export function xyzToLch(...xyz: number[]) {
  xyz = xyz.flat();
  return pipe(xyzToRgb, rgbToLch)(xyz);
}

export const xyz = {
  lab: (...xyz: (number | number[])[]) => xyzToLab(...xyz.flat()),
  rgb: (...xyz: (number | number[])[]) => xyzToRgb(...xyz.flat()),
  hsl: (...xyz: (number | number[])[]) => xyzToHsl(...xyz.flat()),
  hwb: (...xyz: (number | number[])[]) => xyzToHwb(...xyz.flat()),
  hsv: (...xyz: (number | number[])[]) => xyzToHsv(...xyz.flat()),
  cmyk: (...xyz: (number | number[])[]) => xyzToCmyk(...xyz.flat()),
  hex: (...xyz: (number | number[])[]) => xyzToHex(...xyz.flat()),
  lch: (...xyz: (number | number[])[]) => xyzToLch(...xyz.flat()),
};
