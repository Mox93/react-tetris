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
      <div className="container">
        <h1 className="title">
          <span>t</span>
          <span>e</span>
          <span>t</span>
          <span>r</span>
          <span>i</span>
          <span>s</span>
        </h1>
        <div className="canvas">
          <div className="sidebar">
            <ShapeViewer
              size={size}
              title="hold"
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
              title="next"
              {...(gameState.state === "Pause"
                ? {}
                : { shapes: gameState.nextShapes })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
