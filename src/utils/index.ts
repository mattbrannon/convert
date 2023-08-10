export const pipe =
  (...fns: any[]) =>
    (input: any) =>
      fns.reduce((acc, callback) => callback(acc), input);

export const toFloat = (value: number) => {
  return Math.round(value * 100) / 100;
};

export const isHex = (s: string): boolean => {
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

const isShort = (s: string): boolean => {
  return isHex(s) && removeHash(s).length <= 4;
};

export const makeLong = (s: string): string => {
  if (isShort(s)) {
    return addHash(
      Array.from(removeHash(s))
        .map((v) => v.repeat(2))
        .join('')
    );
  }
  return addHash(s);
};

export const keepHueInRange = (n: number) => {
  while (n >= 360) {
    n -= 360;
  }
  while (n < 0) {
    n += 360;
  }
  return n;
};
