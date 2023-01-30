import { pipe } from '../utils';

const radianToGradian = (rad: number): number => Math.round(rad * (200 / Math.PI) * 100) / 100;
const radianToDegree = (rad: number): number => Math.round(rad * (180 / Math.PI) * 100) / 100;
const radianToTurn = (rad: number): number => Math.round((rad / (Math.PI * 2)) * 10000) / 10000;

const gradianToRadian = (grad: number): number =>
  Math.round(grad * (Math.PI / 200) * 10000) / 10000;
const gradianToDegree = (grad: number): number => pipe(gradianToRadian, radianToDegree)(grad);
const gradianToTurn = (grad: number): number => pipe(gradianToRadian, radianToTurn)(grad);

const degreeToRadian = (deg: number): number => Math.round(deg * (Math.PI / 180) * 10000) / 10000;
const degreeToGradian = (deg: number): number => pipe(degreeToRadian, radianToGradian)(deg);
const degreeToTurn = (deg: number): number => Math.round((deg / 360) * 10000) / 10000;

const turnToRadian = (turn: number): number => Math.round(turn * (Math.PI * 2) * 10000) / 10000;
const turnToGradian = (turn: number): number => pipe(turnToRadian, radianToGradian)(turn);
const turnToDegree = (turn: number): number => Math.round(turn * 360 * 10000) / 10000;

export const radian = {
  degree: (n: number) => radianToDegree(n),
  gradian: (n: number) => radianToGradian(n),
  turn: (n: number) => radianToTurn(n),
};

export const gradian = {
  degree: (n: number) => gradianToDegree(n),
  radian: (n: number) => gradianToRadian(n),
  turn: (n: number) => gradianToTurn(n),
};

export const degree = {
  radian: (n: number) => degreeToRadian(n),
  gradian: (n: number) => degreeToGradian(n),
  turn: (n: number) => degreeToTurn(n),
};

export const turn = {
  radian: (n: number) => turnToRadian(n),
  gradian: (n: number) => turnToGradian(n),
  degree: (n: number) => turnToDegree(n),
};

export const angles = {
  radian,
  gradian,
  degree,
  turn,
};
