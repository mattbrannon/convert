import convert from '../src';
import { toFloat } from '../src/utils';

const red = {
  rgb: [ 255, 0, 0 ],
  hex: '#ff0000',
  hsl: [ 0, 100, 50 ],
  hsv: [ 0, 100, 100 ],
  hwb: [ 0, 0, 0 ],
  cmyk: [ 0, 100, 100, 0 ],
  lch: [ 53.23, 104.58, 40 ],
  xyz: [ 41.24, 21.26, 1.93 ],
  lab: [ 53.23, 80.11, 67.22 ],
};

const green = {
  rgb: [ 0, 255, 0 ],
  hex: '#00ff00',
  hsl: [ 120, 100, 50 ],
  hsv: [ 120, 100, 100 ],
  hwb: [ 120, 0, 0 ],
  cmyk: [ 100, 0, 100, 0 ],
  lch: [ 87.74, 119.78, 136.02 ],
  xyz: [ 35.76, 71.52, 11.92 ],
  lab: [ 87.74, -86.18, 83.18 ],
};

const blue = {
  rgb: [ 0, 0, 255 ],
  hex: '#0000ff',
  hsl: [ 240, 100, 50 ],
  hsv: [ 240, 100, 100 ],
  hwb: [ 240, 0, 0 ],
  cmyk: [ 100, 100, 0, 0 ],
  lch: [ 32.3, 133.82, 306.29 ],
  xyz: [ 18.05, 7.22, 95.05 ],
  lab: [ 32.3, 79.2, -107.86 ],
};

const withAlpha = {
  rgb: [ 255, 0, 0, 0.5 ],
  hex: '#ff0000',
  hsl: [ 0, 100, 50, 0.5 ],
  hsv: [ 0, 100, 100, 0.5 ],
  hwb: [ 0, 0, 0, 0.5 ],
  cmyk: [ 0, 100, 100, 0 ],
  lch: [ 53.23, 104.58, 40 ],
  xyz: [ 41.24, 21.26, 1.93 ],
  lab: [ 53.23, 80.11, 67.22 ],
};

function runTests(obj) {
  describe('color conversion', () => {
    const formats = Object.keys(obj);
    formats.forEach((format) => {
      describe(format, () => {
        formats
          .filter((currentFormat) => currentFormat !== format)
          .forEach((colorSpace) => {
            test(`converts ${format} to ${colorSpace}`, () => {
              const result = convert[format][colorSpace](obj[format]);
              const actual = Array.isArray(result)
                ? JSON.stringify(result.map(toFloat))
                : JSON.stringify(result);
              const expected = JSON.stringify(obj[colorSpace]);

              if (actual !== expected) {
                if (Array.isArray(result)) {
                  const arr1 = [ ...result ];
                  const arr2 = [ ...obj[colorSpace] ];

                  arr1.forEach((value, i) => {
                    const diff = toFloat(Math.abs(arr2[i] - value));
                    expect(diff).toBeLessThanOrEqual(0.01);
                  });
                }
              }
              else {
                expect(actual).toEqual(expected);
              }
            });
          });
      });
    });
  });
}

runTests(red);
runTests(blue);
runTests(green);
runTests(withAlpha);
