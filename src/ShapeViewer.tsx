import Cell from "Cell";
import { BlockGrid, Shape } from "models";
import { FunctionComponent } from "react";

interface ShapeViewerProps {
  size: number;
  title: string;
  shapes?: Shape[];
  slots?: number;
}

interface ShapeDrawerProps {
  shape: Shape;
}

const ShapeViewer: FunctionComponent<ShapeViewerProps> = ({
  size,
  title,
  shapes = [],
  slots = 1,
}) => {
  return (
    <div className="shape-viewer viewer">
      <h2 className="title">{title}</h2>
      <div
        className="view"
        style={{
          width: `${size * 5}px`,
          height: `${size * slots * 3}px`,
        }}
      >
        {shapes.map((shape) => (
          <ShapeDrawer key={shape.color} {...{ shape,  }} />
        ))}
      </div>
    </div>
  );
};

const ShapeDrawer: FunctionComponent<ShapeDrawerProps> = ({ shape }) => {
  const xs = shape.positions.map(({ x }) => x);
  const ys = shape.positions.map(({ y }) => y);
  const minX = Math.min(...xs);
  const width = Math.max(...xs) - minX + 1;
  const height = Math.max(...ys) - Math.min(...ys) + 1;

  const grid: BlockGrid = [...Array(height)].map(() =>
    [...Array(width)].map(() => null)
  );

  shape.positions.forEach(({ x, y }) => (grid[y][x - minX] = shape.color));

  return (
    <div>
      {grid.map((row, yIdx) => (
        <div className="grid-row" key={yIdx}>
          {row.map((color, xIdx) => (
            <Cell
              key={xIdx}
              {...(color ? { activeColor: color } : {})}
              invisible={!color}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ShapeViewer;
