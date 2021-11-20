import Grid from "Grid";
import { w, h, toBlocks } from "utils";
import { useGameLoop } from "main";

function App() {
  const { rubble, shape } = useGameLoop();

  return (
    <div className="App">
      <Grid
        width={w}
        hight={h}
        cellSize={32}
        blocks={[...rubble, ...toBlocks(shape)]}
      ></Grid>
    </div>
  );
}

export default App;
