import { Shape } from "models";

const O: Shape = {
  positions: [
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 5, y: 0 },
    { x: 5, y: 1 },
  ],
  color: "Gold",
  pivot: { x: 4.5, y: 1.5 },
};
const T: Shape = {
  positions: [
    { x: 4, y: 0 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
  ],
  color: "BlueViolet",
  pivot: { x: 4, y: 1 },
};
const I: Shape = {
  positions: [
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
  ],
  color: "LightSkyBlue",
  pivot: { x: 4.5, y: -0.5 },
};
const L: Shape = {
  positions: [
    { x: 5, y: 0 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
  ],
  color: "Orange",
  pivot: { x: 4, y: 1 },
};
const J: Shape = {
  positions: [
    { x: 3, y: 0 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
  ],
  color: "DodgerBlue",
  pivot: { x: 4, y: 1 },
};
const S: Shape = {
  positions: [
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
  ],
  color: "ForestGreen",
  pivot: { x: 4, y: 1 },
};
const Z: Shape = {
  positions: [
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
  ],
  color: "FireBrick",
  pivot: { x: 4, y: 1 },
};

export function newShape(): Shape {
  return [O, T, I, L, J, S, Z][Math.floor(Math.random() * 7)];
}
