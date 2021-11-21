import { Block, Position, Shape } from "models";

export const w = 10;
export const h = 20;

export function toBlocks(shape: Shape): Block[] {
  return shape.positions.map((pos) => ({
    pos,
    color: shape.color,
  }));
}

export function canDrop(shape: Shape, blocks: Block[]): boolean {
  return canExist(applyMove(shape, 0, 1), blocks);
}

export function move(
  shape: Shape,
  dx: number,
  dy: number,
  blocks: Block[]
): Shape {
  const newShape = applyMove(shape, dx, dy);

  return canExist(newShape, blocks) ? newShape : shape;
}

export function rotate(
  shape: Shape,
  direction: "CW" | "CCW",
  blocks: Block[]
): Shape {
  const newShape = applyRotate(shape, direction);
  const key: string = `${shape.rotationIndex}>>${newShape.rotationIndex}`;

  if (canExist(newShape, blocks)) {
    return newShape;
  } else {
    for (let kick of shape.wallKickTable[key]) {
      let altShape = applyMove(newShape, kick.x, kick.y);

      if (canExist(altShape, blocks)) {
        return altShape;
      }
    }
  }

  return shape;
}

function canExist(shape: Shape, blocks: Block[]): boolean {
  return shape.positions.every((pos) => positionChecks(pos, blocks));
}

function positionChecks(pos: Position, blocks: Block[]): boolean {
  const verticalCheck = 0 <= pos.y && pos.y < h;
  const horizontalCheck = 0 <= pos.x && pos.x < w;
  const collisionCheck = blocks.every(
    ({ pos: { x, y } }) => !(y === pos.y && x === pos.x)
  );

  return verticalCheck && horizontalCheck && collisionCheck;
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
    rotationIndex:
      direction === "CW"
        ? (shape.rotationIndex + 1) % 4
        : direction === "CCW"
        ? (shape.rotationIndex - 1) % 4
        : shape.rotationIndex,
  };
}
