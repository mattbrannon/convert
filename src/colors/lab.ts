import { xyzToRgb } from './xyz';
import { pipe, keepHueInRange } from '../utils';
import { rgbToHsl, rgbToHex, rgbToCmyk, rgbToHsv, rgbToHwb } from './rgb';

export function labToXYZ(...lab: number[]) {
  const [ l, a, b ] = lab.flat();
  const epsilon = 0.008856; // Constant for cube root calculations
  // const kappa = 903.3; // Constant for cube root calculations

  // Reference white values (D65 standard illuminant)
  const Xn = 0.95047;
  const Yn = 1.0;
  const Zn = 1.08883;

  // Helper function for inverse conversion
  function fInv(t: number) {
    if (t > epsilon) {
      return Math.pow(t, 3);
    }
    else {
      return (t - 16 / 116) / 7.787;
    }
  }

  const L = (l + 16) / 116;
  const X = fInv(L + a / 500) * Xn;
  const Y = fInv(L) * Yn;
  const Z = fInv(L - b / 200) * Zn;

  return [ X * 100, Y * 100, Z * 100 ];
}

function labToRgb(...lab: number[]) {
  return pipe(labToXYZ, xyzToRgb)(lab.flat());
}

function labToHsl(...lab: number[]) {
  return pipe(labToRgb, rgbToHsl)(lab.flat());
}

function labToHex(...lab: number[]) {
  return pipe(labToRgb, rgbToHex)(lab.flat());
}

function labToCmyk(...lab: number[]) {
  return pipe(labToRgb, rgbToCmyk)(lab.flat());
}

function labToHsv(...lab: number[]) {
  return pipe(labToRgb, rgbToHsv)(lab.flat());
}

function labToHwb(...lab: number[]) {
  return pipe(labToRgb, rgbToHwb)(lab.flat());
}

export function labToLch(...lab: number[]) {
  const [ l, a, b ] = lab.flat();
  // Calculate chroma (c)
  const c = Math.sqrt(a * a + b * b);
  // Calculate hue (h)
  const h = keepHueInRange((Math.atan2(b, a) * 180) / Math.PI);

  return [ l, c, h ];
}

// function labToLch(...lab: number[]) {
//   return pipe(labToRgb, rgbToLch)(lab.flat());
// }

export const lab = {
  xyz: (...lab: (number | number[])[]) => labToXYZ(...lab.flat()),
  rgb: (...lab: (number | number[])[]) => labToRgb(...lab.flat()),
  hsl: (...lab: (number | number[])[]) => labToHsl(...lab.flat()),
  hex: (...lab: (number | number[])[]) => labToHex(...lab.flat()),
  cmyk: (...lab: (number | number[])[]) => labToCmyk(...lab.flat()),
  hsv: (...lab: (number | number[])[]) => labToHsv(...lab.flat()),
  hwb: (...lab: (number | number[])[]) => labToHwb(...lab.flat()),
  lch: (...lab: (number | number[])[]) => labToLch(...lab.flat()),
};
