import GameOverScreen from "GameOverScreen";
import Grid from "Grid";
import { useGameLoop } from "main";
import PlayButton from "PlayButton";
import ScoreViewer from "ScoreViewer";
import ShapeViewer from "ShapeViewer";
import { emptyGrid } from "utils";

function App() {
  const size = 32;
  const [gameState, actions] = useGameLoop();

  return (
    <div className="App">
      <h1 className="title">TETRIS</h1>
      <div className="canvas">
        <div className="sidebar">
          <ShapeViewer
            size={size}
            title="HOLD"
            {...(gameState.state === "Pause"
              ? {}
              : gameState.hold
              ? { shapes: [gameState.hold] }
              : {})}
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
            blockGrid={
              gameState.state === "Pause" ? emptyGrid() : gameState.grid
            }
            shape={gameState.state === "Pause" ? null : gameState.shape}
          >
            {gameState.state === "Pause" && (
              <PlayButton resumeGame={actions.play} />
            )}
            {gameState.state === "GameOver" && (
              <GameOverScreen resetGame={actions.reset} />
            )}
          </Grid>
        </div>
        <div className="sidebar">
          <ShapeViewer
            size={size}
            slots={3}
            title="NEXT"
            {...(gameState.state === "Pause"
              ? {}
              : { shapes: gameState.nextShapes })}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
