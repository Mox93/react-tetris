import Grid from "Grid";
import { useGameLoop } from "main";
import ScoreViewer from "ScoreViewer";
import ShapeViewer from "ShapeViewer";

function App() {
  const size = 32;
  const gameState = useGameLoop();

  return (
    <div className="App">
      <h1 className="title">TETRIS</h1>
      <div className="canvas">
        <div className="sidebar">
          <ShapeViewer
            size={size}
            title="HOLD"
            {...(gameState.hold ? { shapes: [gameState.hold] } : {})}
          />
          <ScoreViewer
            score={gameState.score}
            level={gameState.level}
            lines={gameState.lines}
          />
        </div>
        <div className="viewer">
          <Grid
            cellSize={size}
            blockGrid={gameState.grid}
            shape={gameState.shape}
          />
        </div>
        <div className="sidebar">
          <ShapeViewer size={size} title="NEXT" shapes={gameState.nextShapes} />
        </div>
      </div>
    </div>
  );
}

export default App;
