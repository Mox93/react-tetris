import { FunctionComponent } from "react";
import Cell from "Cell";
import { BlockGrid, Shape } from "models";
import { buffer, hardDrop } from "utils";

interface GridProps {
  cellSize: number;
  blockGrid: BlockGrid;
  shape: Shape | null;
}

const Grid: FunctionComponent<GridProps> = ({
  cellSize,
  blockGrid,
  shape,
  children,
}) => {
  const grid = blockGrid.slice(buffer).map((row) => [...row]);
  const shadowPos: { [key: string]: string } = {};

  if (shape) {
    const shadow = getShadow(shape, blockGrid);

    shape.positions.forEach(({ x, y }) =>
      y < buffer ? void 0 : (grid[y - buffer][x] = shape.color)
    );

    if (shadow) {
      shadow.positions.forEach(
        ({ x, y }) => (shadowPos[`${x}-${y - buffer}`] = shape.color)
      );
    }
  }

  return (
    <div className="grid-container">
      {grid.map((row, yIdx) => (
        <div className="grid-row" key={yIdx}>
          {row.map((color, xIdx) => (
            <Cell
              key={xIdx}
              cellSize={cellSize}
              {...(color ? { activeColor: color } : {})}
              {...(shadowPos[`${xIdx}-${yIdx}`]
                ? { shadowColor: shadowPos[`${xIdx}-${yIdx}`] }
                : {})}
            />
          ))}
        </div>
      ))}
      {children}
    </div>
  );
};

function getShadow(shape: Shape, grid: BlockGrid): Shape | null {
  let shadow = hardDrop(shape, grid);
  return shadow.pivot.y !== shape.pivot.y ? shadow : null;
}

export default Grid;
