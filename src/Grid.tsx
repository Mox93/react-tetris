import { FunctionComponent } from "react";
import Cell from "Cell";
import { BlockGrid, Shape } from "models";
import { canDrop, hardDrop, move } from "utils";

interface GridProps {
  cellSize: number;
  blockGrid: BlockGrid;
  shape: Shape;
}

const Grid: FunctionComponent<GridProps> = ({ cellSize, blockGrid, shape }) => {
  const grid = blockGrid.map((row) => [...row]);
  const shadow = getShadow(shape, grid);
  const shadowPos: { [key: string]: string } = {};

  shape.positions.forEach(({ x, y }) => (grid[y][x] = shape.color));

  if (shadow) {
    shadow.positions.forEach(
      ({ x, y }) => (shadowPos[`${x}-${y}`] = shape.color)
    );
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
    </div>
  );
};

function getShadow(shape: Shape, grid: BlockGrid): Shape | null {
  let shadow = hardDrop(shape, grid);
  return shadow.pivot.y !== shape.pivot.y ? shadow : null;
}

export default Grid;
