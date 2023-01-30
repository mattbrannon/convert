export const pipe =
  (...fns: any[]) =>
    (input: any) =>
      fns.reduce((acc, callback) => callback(acc), input);

const makeFloat = (decimal: number) => (value: number) =>
  Math.round(value * decimal) / decimal;

export const toFloat = makeFloat(100);

export const isHex = (s: string) => {
  try {
    const re = /^#?([0-9A-F]{3,4}|[0-9A-F]{6}|[0-9A-F]{8})$/gi;
    return typeof s === 'string' && re.test(s);
  }
  catch {
    return false;
  }
};

export const removePrefix = (prefix: string) => (s: string) => {
  return s.charAt(0) === prefix ? s.slice(1) : s;
};

export const addPrefix = (prefix: string) => (s: string) => {
  return s.charAt(0) !== prefix ? prefix + s : s;
};

export const removeHash = removePrefix('#');
export const addHash = addPrefix('#');

const isShort = (s: string) => {
  return isHex(s) && removeHash(s).length <= 4;
};

export const makeLong = (s: string) => {
  if (isShort(s)) {
    return addHash(
      Array.from(removeHash(s))
        .map((v) => v.repeat(2))
        .join('')
    );
  }
  return addHash(s);
};
