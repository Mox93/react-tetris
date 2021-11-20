import { useEffect, useReducer } from "react";
import { GameState } from "models";
import { canExistAt, move, rotate, toBlocks } from "utils";
import { newShape } from "Shapes";

export function useGameLoop(): GameState {
  const [state, dispatch] = useReducer(shapeReducer, {
    shape: newShape(),
    rubble: [],
  });

  useControls((event) => dispatch(event.code));

  useEffect(() => {
    const tick = setTimeout(() => {
      if (
        state.shape.positions.every((pos) =>
          canExistAt({ ...pos, y: pos.y + 1 }, state.rubble)
        )
      ) {
        dispatch("ArrowDown");
      } else {
        dispatch("New");
      }
    }, 500);
    return () => clearTimeout(tick);
  }, [state.shape]);

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
    case "New":
      return {
        ...state,
        shape: newShape(),
        rubble: [...rubble, ...toBlocks(shape)],
      };
    default:
      return state;
  }
}
