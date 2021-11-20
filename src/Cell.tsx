import { FunctionComponent } from "react";

interface CellProps {
  cellSize: number;
  activeColor?: string;
}

const Cell: FunctionComponent<CellProps> = ({ cellSize, activeColor }) => {
  const activeStyling = activeColor
    ? {
        backgroundColor: activeColor,
      }
    : {};
  const classes = `cell ${activeColor ? "active-cell" : ""}`;

  return (
    <div
      className={classes}
      style={{
        width: cellSize,
        height: cellSize,
        ...activeStyling,
      }}
    />
  );
};

export default Cell;
