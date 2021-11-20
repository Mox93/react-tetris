import { FunctionComponent } from "react";
import Cell from "Cell";
import { Block } from "models";

interface GridProps {
  cellSize: number;
  width: number;
  hight: number;
  blocks?: Block[];
}

interface CellMeta {
  size: number;
  id: string;
  activeColor?: string;
}

const Grid: FunctionComponent<GridProps> = ({
  cellSize,
  width,
  hight,
  blocks = [],
}) => {
  const grid: CellMeta[][] = [];
  for (let y = 0; y < hight; y++) {
    grid.push([]);
    for (let x = 0; x < width; x++) {
      grid[y].push({
        size: cellSize,
        id: `${x}${y}`,
      });
    }
  }

  for (let { pos, color } of blocks) {
    grid[pos.y][pos.x].activeColor = color;
  }

  return (
    <div className="grid-container">
      {grid.map((row, idx) => (
        <div className="grid-row" key={idx}>
          {row.map((cell) => (
            <Cell
              key={cell.id}
              cellSize={cell.size}
              activeColor={cell.activeColor}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
