import { BlockGrid, GameEvaluation, Position, Shape } from "models";

export const buffer = 2;
const w = 10;
const h = 20 + buffer;

const scorePerLine = [40, 100, 300, 1200];

export function emptyGrid(): BlockGrid {
  return [...Array(h)].map(() => [...Array(w)].map(() => null));
}

export function canDrop(shape: Shape, grid: BlockGrid): boolean {
  return canExist(applyMove(shape, 0, 1), grid);
}

export function outOfRange(shape: Shape) {
  for (let pos of shape.positions) {
    if (pos.y < buffer) {
      return true
    }
  }
  return false;
}

export function move(
  shape: Shape,
  dx: number,
  dy: number,
  grid: BlockGrid
): Shape {
  const newShape = applyMove(shape, dx, dy);

  return canExist(newShape, grid) ? newShape : shape;
}

export function rotate(
  shape: Shape,
  direction: "CW" | "CCW",
  grid: BlockGrid
): Shape {
  const newShape = applyRotate(shape, direction);
  const key: string = `${shape.rotationIndex}>>${newShape.rotationIndex}`;

  if (canExist(newShape, grid)) {
    return newShape;
  } else {
    for (let kick of newShape.wallKickTable[key]) {
      let altShape = applyMove(newShape, kick.x, kick.y);

      if (canExist(altShape, grid)) {
        return altShape;
      }
    }
  }

  return shape;
}

export function hardDrop(shape: Shape, grid: BlockGrid): Shape {
  let newShape = shape;
  while (canDrop(newShape, grid)) {
    newShape = move(newShape, 0, 1, grid);
  }

  return newShape;
}

export function evaluateTurn(
  shape: Shape,
  grid: BlockGrid,
  level: number
): [BlockGrid, GameEvaluation] {
  shape.positions.forEach(({ x, y }) => (grid[y][x] = shape.color));

  const [newGrid, lineCount] = clearRows(grid);

  return [
    newGrid,
    {
      score: lineCount ? scorePerLine[lineCount - 1] * (level + 1) : 0,
      lineCount: lineCount,
    },
  ];
}

function clearRows(grid: BlockGrid): [BlockGrid, number] {
  let lineCount = 0;
  const newGrid: BlockGrid = [];

  grid.forEach((row) => {
    if (row.filter((color) => color).length === w) {
      lineCount++;
    } else {
      newGrid.push(row);
    }
  });

  const dy = grid.length - newGrid.length;

  for (let i = 0; i < dy; i++) {
    newGrid.unshift([...Array(w)].map(() => null));
  }

  return [newGrid, lineCount];
}

function canExist(shape: Shape, grid: BlockGrid): boolean {
  return shape.positions.every((pos) => positionChecks(pos, grid));
}

function positionChecks(pos: Position, grid: BlockGrid): boolean {
  const verticalCheck = 0 <= pos.y && pos.y < h;
  const horizontalCheck = 0 <= pos.x && pos.x < w;

  if (verticalCheck && horizontalCheck) {
    return !grid[pos.y][pos.x];
  }

  return false;
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
    positions: shape.positions.map(({ x, y }) =>
      direction === "CW"
        ? {
            x: shape.pivot.x + shape.pivot.y - y,
            y: x + shape.pivot.y - shape.pivot.x,
          }
        : {
            x: y + shape.pivot.x - shape.pivot.y,
            y: shape.pivot.y + shape.pivot.x - x,
          }
    ),
    rotationIndex:
      direction === "CW"
        ? (shape.rotationIndex + 1) % 4
        : (shape.rotationIndex + 3) % 4,
  };
}
