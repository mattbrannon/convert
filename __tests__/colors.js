const convert = require('../src/index.cjs');

const values = {
  rgb: [ 255, 0, 255 ],
  hex: '#ff00ff',
  hsl: [ 300, 100, 50 ],
  hsv: [ 300, 100, 100 ],
  hwb: [ 300, 0, 0 ],
  cmyk: [ 0, 100, 0, 0 ],
  lch: [ 60.319933664076004, 115.56712429966026, -31.76746584627805 ],
};

const greyscale = {
  rgb: [ 110, 110, 110 ],
  hex: '#6e6e6e',
  hsl: [ 0, 0, 43 ],
  hsv: [ 0, 0, 43 ],
  hwb: [ 0, 43, 57 ],
  cmyk: [ 0, 0, 0, 57 ],
  lch: [ 46.435452806471034, 0.006276937205362022, -63.18707376349507 ],
};

describe('color conversion', () => {
  const formats = Object.keys(values);
  formats.forEach((format) => {
    describe(format, () => {
      formats
        .filter((currentFormat) => currentFormat !== format)
        .forEach((colorSpace) => {
          test(`converts ${format} to ${colorSpace}`, () => {
            expect(convert[format][colorSpace](values[format])).toEqual(
              values[colorSpace]
            );
          });
          test(`converts ${format} to ${colorSpace} GREYSCALE`, () => {
            expect(convert[format][colorSpace](greyscale[format])).toEqual(
              greyscale[colorSpace]
            );
          });
        });
    });
  });
});
