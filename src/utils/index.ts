export const pipe =
  (...fns: any[]) =>
    (input: any) =>
      fns.reduce((acc, callback) => callback(acc), input);

export const toFloat = (value: number) => {
  return Math.round(value * 100) / 100;
};

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

export const removeHash = (s: string): string => {
  return s.startsWith('#') ? s.slice(1) : s;
};

export const addHash = (s: string): string => {
  return s.startsWith('#') ? s : '#' + s;
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
