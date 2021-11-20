import { Block, Position, Shape } from "models";

export const w = 10;
export const h = 20;

export function toBlocks(shape: Shape): Block[] {
  return shape.positions.map((pos) => ({
    pos,
    color: shape.color,
  }));
}

export function canExistAt(pos: Position, blocks: Block[]): boolean {
  const verticalCheck = 0 <= pos.y && pos.y < h;
  const horizontalCheck = 0 <= pos.x && pos.x < w;
  const collisionCheck = blocks.every(
    ({ pos: { x, y } }) => !(y === pos.y && x === pos.x)
  );
  return verticalCheck && horizontalCheck && collisionCheck;
}

export function move(
  shape: Shape,
  dx: number,
  dy: number,
  blocks: Block[]
): Shape {
  const newShape = applyMove(shape, dx, dy);

  return newShape.positions.every((pos) => canExistAt(pos, blocks))
    ? newShape
    : shape;
}

export function rotate(
  shape: Shape,
  direction: "CW" | "CCW",
  blocks: Block[]
): Shape {
  const newShape = applyRotate(shape, direction);
  return newShape.positions.every((pos) => canExistAt(pos, blocks))
    ? newShape
    : shape;
}

function applyMove(shape: Shape, dx: number, dy: number): Shape {
  return {
    ...shape,
    positions: shape.positions.map(({ x, y }) => ({
      x: x + dx,
      y: y + dy,
    })),
    pivot: { x: shape.pivot.x + dx, y: shape.pivot.y + dy },
  };
}

function applyRotate(shape: Shape, direction: "CW" | "CCW"): Shape {
  return {
    ...shape,
    positions: shape.positions.map(({ x, y }) => {
      switch (direction) {
        case "CW":
          return {
            x: shape.pivot.x + shape.pivot.y - y,
            y: x + shape.pivot.y - shape.pivot.x,
          };
        case "CCW":
          return {
            x: y + shape.pivot.x - shape.pivot.y,
            y: shape.pivot.y + shape.pivot.x - x,
          };
        default:
          return { x, y };
      }
    }),
  };
}
