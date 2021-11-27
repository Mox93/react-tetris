import { useEffect, useReducer } from "react";
import { GameState, Shape } from "models";
import { canDrop, evaluateTurn, move, rotate, h, w, hardDrop } from "utils";
import { getOriginal, newNextShapes, newShape } from "Shapes";

const nextShapes = newNextShapes(4);

const initialState: GameState = {
  shape: nextShapes[0],
  grid: [...Array(h)].map(() => [...Array(w)].map(() => null)),
  nextShapes: nextShapes.slice(1),
  canSwap: true,
  score: 0,
  lines: 0,
  level: 0,
};

export function useGameLoop(): GameState {
  const [state, dispatch] = useReducer<
    (state: GameState, action: string) => GameState
  >(reducer, initialState);

  useControls((event) => dispatch(event.code));

  useEffect(() => {
    const drop = setTimeout(
      () => dispatch("HandleTurn"),
      Math.max(1000 - 100 * state.level, 100)
    );
    return () => clearTimeout(drop);
  }, [state.shape.pivot.y]);

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

function reducer(state: GameState, action: string): GameState {
  const { shape, grid, nextShapes, hold } = state;
  let newShape$: Shape;

  switch (action) {
    // KEYBOARD INPUT
    case "ArrowLeft":
      return { ...state, shape: move(shape, -1, 0, grid) };
    case "ArrowRight":
      return { ...state, shape: move(shape, 1, 0, grid) };
    case "ArrowDown":
      newShape$ = move(shape, 0, 1, grid);

      return {
        ...state,
        shape: newShape$,
        score: state.score + newShape$.pivot.y - shape.pivot.y,
      };
    case "ArrowUp":
      return { ...state, shape: rotate(shape, "CW", grid) };
    case "KeyZ":
      return { ...state, shape: rotate(shape, "CCW", grid) };
    case "KeyC":
      return state.canSwap
        ? {
            ...state,
            ...(hold
              ? { shape: hold, canSwap: false }
              : reducer(state, "NextShape")),
            hold: getOriginal(shape),
          }
        : state;
    case "Space":
      newShape$ = hardDrop(shape, grid);
      return {
        ...state,
        shape: newShape$,
        score: state.score + (newShape$.pivot.y - shape.pivot.y) * 2,
      };

    // GAME LOOP
    case "HandleTurn":
      return reducer(state, canDrop(shape, grid) ? "Drop" : "EndTurn");
    case "Drop":
      return { ...state, shape: move(shape, 0, 1, grid) };
    case "EndTurn":
      const [newGrid, evaluation] = evaluateTurn(shape, grid, state.level);

      return {
        ...reducer(state, "NextShape"),
        grid: newGrid,
        score: state.score + evaluation.score,
        lines: state.lines + evaluation.lineCount,
      };
    case "NextShape":
      return {
        ...state,
        shape: nextShapes[0],
        nextShapes: [
          ...nextShapes.slice(1),
          newShape(nextShapes.map(({ color }) => color)),
        ],
        canSwap: true,
      };
    default:
      return state;
  }
}
