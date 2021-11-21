import { useEffect, useReducer } from "react";
import { GameState } from "models";
import { canDrop, move, rotate, toBlocks } from "utils";
import { newShape } from "Shapes";

export function useGameLoop(): GameState {
  const [state, dispatch] = useReducer<
    (state: GameState, action: string) => GameState
  >(shapeReducer, {
    shape: newShape(),
    rubble: [],
  });

  useControls((event) => dispatch(event.code));

  useEffect(() => {
    const tick = setTimeout(() => {
      if (canDrop(state.shape, state.rubble)) {
        dispatch("ArrowDown");
      } else {
        dispatch("Spawn");
      }
    }, 500);
    return () => clearTimeout(tick);
  }, [state]);

  return state;
}

function useControls(handleKeyDown: (event: KeyboardEvent) => void) {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}

function shapeReducer(state: GameState, action: string): GameState {
  const { shape, rubble } = state;

  switch (action) {
    case "ArrowLeft":
      return { ...state, shape: move(shape, -1, 0, rubble) };
    case "ArrowRight":
      return { ...state, shape: move(shape, 1, 0, rubble) };
    case "ArrowDown":
      return { ...state, shape: move(shape, 0, 1, rubble) };
    case "ArrowUp":
      return { ...state, shape: rotate(shape, "CW", rubble) };
    case "KeyZ":
      return { ...state, shape: rotate(shape, "CCW", rubble) };
    case "Spawn":
      return {
        ...state,
        shape: newShape(),
        rubble: [...rubble, ...toBlocks(shape)],
      };
    default:
      return state;
  }
}
