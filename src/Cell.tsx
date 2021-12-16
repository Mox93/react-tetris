import { FunctionComponent } from "react";

interface CellProps {
  activeColor?: string;
  shadowColor?: string;
  invisible?: boolean;
}

const Cell: FunctionComponent<CellProps> = ({
  activeColor,
  shadowColor,
  invisible = false,
}) => {
  const styling = activeColor
    ? { backgroundColor: activeColor }
    : shadowColor
    ? { border: `2px solid ${shadowColor}` }
    : {};

  return (
    <div
      className={`cell ${
        activeColor
          ? "active"
          : shadowColor
          ? "shadow"
          : invisible
          ? ""
          : "visible"
      }`}
      data-color={activeColor || shadowColor}
      style={invisible ? {} : styling}
    />
  );
};

export default Cell;
