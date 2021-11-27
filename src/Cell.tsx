import { FunctionComponent } from "react";

interface CellProps {
  cellSize: number;
  activeColor?: string;
  shadowColor?: string;
  invisible?: boolean;
}

const Cell: FunctionComponent<CellProps> = ({
  cellSize,
  activeColor,
  shadowColor,
  invisible = false,
}) => {
  const styling = activeColor
    ? { backgroundColor: activeColor }
    : shadowColor
    ? {
        borderColor: shadowColor,
        boxShadow: `0 0 0 1px ${shadowColor}`,
        zIndex: 2,
      }
    : {};
  const classes = `cell ${activeColor ? "active-cell" : ""}`;

  return (
    <div
      {...(invisible ? {} : { className: classes })}
      style={{
        width: cellSize,
        height: cellSize,
        ...(invisible ? {} : styling),
      }}
    />
  );
};

export default Cell;
