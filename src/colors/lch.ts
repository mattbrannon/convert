import { pipe } from '../utils';
import { rgbToHsl, rgbToHex, rgbToHwb, rgbToHsv, rgbToCmyk } from './rgb';
import { xyzToRgb } from './xyz';
import { labToXYZ } from './lab';

function lchToHsl(...lch: number[]): number[] {
  return pipe(lchToRgb, rgbToHsl)(lch.flat());
}

function lchToHex(...lch: number[]): string {
  return pipe(lchToRgb, rgbToHex)(lch.flat());
}

function lchToHwb(...lch: number[]): number[] {
  return pipe(lchToRgb, rgbToHwb)(lch.flat());
}

function lchToHsv(...lch: number[]): number[] {
  return pipe(lchToRgb, rgbToHsv)(lch.flat());
}
function lchToCmyk(...lch: number[]): number[] {
  return pipe(lchToRgb, rgbToCmyk)(lch.flat());
}

function lchToXyz(...lch: number[]): number[] {
  return pipe(lchToLab, labToXYZ)(lch.flat());
}

function lchToLab(...lch: number[]) {
  // Convert hue angle from degrees to radians
  const [ l, c, h ] = lch.flat();
  const hRad = (h * Math.PI) / 180;

  // Calculate a* and b* components
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  return [ l, a, b ];
}

function lchToRgb(...lch: number[]) {
  return pipe(lchToLab, labToXYZ, xyzToRgb)(lch.flat());
}

export const lch = {
  rgb: (...lch: (number | number[])[]) => lchToRgb(...lch.flat()),
  hex: (...lch: (number | number[])[]) => lchToHex(...lch.flat()),
  hsl: (...lch: (number | number[])[]) => lchToHsl(...lch.flat()),
  hwb: (...lch: (number | number[])[]) => lchToHwb(...lch.flat()),
  hsv: (...lch: (number | number[])[]) => lchToHsv(...lch.flat()),
  cmyk: (...lch: (number | number[])[]) => lchToCmyk(...lch.flat()),
  xyz: (...lch: (number | number[])[]) => lchToXyz(...lch.flat()),
  lab: (...lch: (number | number[])[]) => lchToLab(...lch.flat()),
};
