const { colors } = require('../src/colors');

const values = {
  rgb: [ 255, 0, 255 ],
  hex: '#ff00ff',
  hsl: [ 300, 100, 50 ],
  hsv: [ 300, 100, 100 ],
  hwb: [ 300, 0, 0 ],
  cmyk: [ 0, 100, 0, 0 ],
  lch: [ 60.319933664076004, 115.56712429966026, -31.76746584627805 ],
};

describe('color conversion', () => {
  const formats = Object.keys(values);
  formats.forEach((format) => {
    describe(format, () => {
      formats
        .filter((currentFormat) => currentFormat !== format)
        .forEach((colorSpace) => {
          test(`converts ${format} to ${colorSpace}`, () => {
            expect(colors[format][colorSpace](values[format])).toEqual(values[colorSpace]);
          });
        });
    });
  });
});
