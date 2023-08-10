import convert from '../src';

const values = {
  degree: 270,
  radian: 4.7124,
  gradian: 300,
  turn: 0.75,
};

describe('angle conversion', () => {
  const formats = Object.keys(values);
  formats.forEach((format) => {
    describe(format, () => {
      formats
        .filter((currentFormat) => currentFormat !== format)
        .forEach((angleSpace) => {
          test(`converts ${format} to ${angleSpace}`, () => {
            expect(convert[format][angleSpace](values[format])).toEqual(
              values[angleSpace]
            );
          });
        });
    });
  });
});
