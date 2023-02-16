import { colors } from './colors';
import { angles } from './angles';

export { cmyk, hex, hsl, hsv, hwb, lch, rgb } from './colors';
export { radian, gradian, degree, turn } from './angles';

export const convert = {
  ...angles,
  ...colors,
};
