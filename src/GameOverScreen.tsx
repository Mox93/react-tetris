import { FunctionComponent, MouseEventHandler } from "react";
import resetIcon from "./assets/reset-filter-1.svg";

interface GameOverScreenProps {
  resetGame: MouseEventHandler<HTMLButtonElement>;
}

const GameOverScreen: FunctionComponent<GameOverScreenProps> = ({
  resetGame,
}) => {
  return (
    <div className="game-over">
      <h2>Game Over</h2>
      <button className="reset-button" onClick={resetGame}>
        <img src={resetIcon} alt="" />
      </button>
    </div>
  );
};

export default GameOverScreen;
