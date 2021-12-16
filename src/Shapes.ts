import { Shape, WallKickTable } from "models";

const wallKickTable: WallKickTable = {
  "0>>1": [
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: -2 },
    { x: -1, y: -2 },
  ],
  "1>>0": [
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
  ],
  "1>>2": [
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
  ],
  "2>>1": [
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: -2 },
    { x: -1, y: -2 },
  ],
  "2>>3": [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: -2 },
    { x: 1, y: -2 },
  ],
  "3>>2": [
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: 0, y: 2 },
    { x: -1, y: 2 },
  ],
  "3>>0": [
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: 0, y: 2 },
    { x: -1, y: 2 },
  ],
  "0>>3": [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: -2 },
    { x: 1, y: -2 },
  ],
};

const O: Shape = {
  positions: [
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 5, y: 0 },
    { x: 5, y: 1 },
  ],
  color: "Gold",
  pivot: { x: 4.5, y: 0.5 },
  rotationIndex: 0,
  wallKickTable: {
    "0>>1": [],
    "1>>0": [],
    "1>>2": [],
    "2>>1": [],
    "2>>3": [],
    "3>>2": [],
    "3>>0": [],
    "0>>3": [],
  },
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
  rotationIndex: 0,
  wallKickTable: wallKickTable,
};
const I: Shape = {
  positions: [
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
  ],
  color: "SkyBlue",
  pivot: { x: 4.5, y: 0.5 },
  rotationIndex: 0,
  wallKickTable: {
    "0>>1": [
      { x: -2, y: 0 },
      { x: 1, y: 0 },
      { x: -2, y: -1 },
      { x: 1, y: 2 },
    ],
    "1>>0": [
      { x: 2, y: 0 },
      { x: -1, y: 0 },
      { x: 2, y: 1 },
      { x: -1, y: -2 },
    ],
    "1>>2": [
      { x: -1, y: 0 },
      { x: 2, y: 0 },
      { x: -1, y: 2 },
      { x: 2, y: -1 },
    ],
    "2>>1": [
      { x: -1, y: 0 },
      { x: -2, y: 0 },
      { x: 1, y: -2 },
      { x: -2, y: 1 },
    ],
    "2>>3": [
      { x: 2, y: 0 },
      { x: -1, y: 0 },
      { x: 2, y: 1 },
      { x: -1, y: -2 },
    ],
    "3>>2": [
      { x: -2, y: 0 },
      { x: 1, y: 0 },
      { x: -2, y: -1 },
      { x: 1, y: 2 },
    ],
    "3>>0": [
      { x: -1, y: 0 },
      { x: -2, y: 0 },
      { x: 1, y: -2 },
      { x: -2, y: 1 },
    ],
    "0>>3": [
      { x: -1, y: 0 },
      { x: 2, y: 0 },
      { x: -1, y: 2 },
      { x: 2, y: -1 },
    ],
  },
};
const L: Shape = {
  positions: [
    { x: 5, y: 0 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
  ],
  color: "OrangeRed",
  pivot: { x: 4, y: 1 },
  rotationIndex: 0,
  wallKickTable: wallKickTable,
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
  rotationIndex: 0,
  wallKickTable: wallKickTable,
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
  rotationIndex: 0,
  wallKickTable: wallKickTable,
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
  rotationIndex: 0,
  wallKickTable: wallKickTable,
};

export function spawnShape(avoidColors: string[] = []): Shape {
  const shapes = [O, T, I, L, J, S, Z].filter(
    ({ color }) => !avoidColors.includes(color)
  );
  return shapes[Math.floor(Math.random() * shapes.length)];
}

export function newNextShapes(count: number): Shape[] {
  const shapes: Shape[] = [];

  for (let i = 0; i < count; i++) {
    shapes.push(spawnShape(shapes.map(({ color }) => color)));
  }

  return shapes;
}

export function getOriginal(shape: Shape): Shape {
  const originalShape = [O, T, I, L, J, S, Z].find(
    ({ color }) => color === shape.color
  );
  return originalShape || shape;
}
