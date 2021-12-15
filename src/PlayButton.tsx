import { FunctionComponent, MouseEventHandler } from "react";
import playIcon from "./assets/play-button-svgrepo-com.svg";

interface PlayButtonProps {
  resumeGame: MouseEventHandler<HTMLButtonElement>;
}

const PlayButton: FunctionComponent<PlayButtonProps> = ({ resumeGame }) => {
  return (
    <button className="play-button" onClick={resumeGame}>
      <img src={playIcon} alt="" />
    </button>
  );
};

export default PlayButton;
