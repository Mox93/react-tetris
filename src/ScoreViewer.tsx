import { FunctionComponent } from "react";

interface ScoreViewerProps {
  score: number;
  level: number;
  lines: number;
}

const ScoreViewer: FunctionComponent<ScoreViewerProps> = ({
  score,
  level,
  lines,
}) => {
  const scores = [
    ["score", score],
    ["level", level],
    ["lines", lines],
  ];

  return (
    <div className="score-viewer viewer">
      {scores.map(([title, value]) => (
        <div className="container" key={title}>
          <h2 className="title">{title}</h2>
          <div className="view">
            <h3 className="value">{value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreViewer;
