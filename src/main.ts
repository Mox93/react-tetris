import { useEffect, useReducer } from "react";
import { Actions, GameState, Shape } from "models";
import {
  canDrop,
  evaluateTurn,
  move,
  rotate,
  hardDrop,
  emptyGrid,
  outOfRange,
} from "utils";
import { getOriginal, newNextShapes, spawnShape } from "Shapes";

const nextShapes = newNextShapes(4);

const initializeState: () => GameState = () => ({
  state: "Play",
  shape: nextShapes[0],
  grid: emptyGrid(),
  nextShapes: nextShapes.slice(1),
  canSwap: true,
  next: { delay: 1000, action: "HandleTurn" },
  score: 0,
  lines: 0,
  level: 0,
});

export function useGameLoop(): [GameState, Actions] {
  const [state, dispatch] = useReducer<
    (state: GameState, action: string) => GameState
  >(reducer, initializeState());

  const handleKeyDown = (event: KeyboardEvent) => dispatch(event.code);

  useEffect(() => {
    if (state.state === "Play") {
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [state.state]);

  useEffect(() => {
    if (state.state === "Play") {
      const drop = setTimeout(
        () => dispatch(state.next.action),
        state.next.delay
      );
      return () => clearTimeout(drop);
    }
  }, [state.next, state.state]);

  return [
    state,
    {
      play: () => dispatch("Play"),
      pause: () => dispatch("Pause"),
      reset: () => dispatch("Reset"),
    },
  ];
}

function reducer(state: GameState, action: string): GameState {
  if (state.state === "GameOver" && action !== "Reset") {
    return state;
  }

  if (state.state === "Pause" && action !== "Play") {
    return state;
  }

  const { shape, grid, nextShapes, hold, score } = state;
  let newShape: Shape;

  state.next.delay = Math.max(1000 - 100 * state.level, 100);

  switch (action) {
    // KEYBOARD INPUT
    case "ArrowLeft":
      return { ...state, shape: move(shape, -1, 0, grid) };

    case "ArrowRight":
      return { ...state, shape: move(shape, 1, 0, grid) };

    case "ArrowDown":
      newShape = move(shape, 0, 1, grid);
      return {
        ...state,
        shape: newShape,
        score: score + newShape.pivot.y - shape.pivot.y,
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
              : { next: { delay: 0, action: "NextShape" } }),
            hold: getOriginal(shape),
          }
        : state;

    case "Space":
      newShape = hardDrop(shape, grid);
      return {
        ...state,
        shape: newShape,
        score: score + (newShape.pivot.y - shape.pivot.y) * 2,
        next: { delay: 0, action: "EndTurn" },
      };

    case "Escape":
      return { ...state, state: "Pause" };

    // GAME LOOP
    case "Play":
      return { ...state, state: "Play" };

    case "Pause":
      return { ...state, state: "Pause" };

    case "Reset":
      return initializeState();

    case "HandleTurn":
      return {
        ...state,
        next: canDrop(shape, grid)
          ? { delay: 0, action: "Drop" }
          : { delay: 1000 - state.next.delay, action: "AwaitEnd" },
      };

    case "Drop":
      return {
        ...state,
        shape: move(shape, 0, 1, grid),
        next: { ...state.next, action: "HandleTurn" },
      };

    case "AwaitEnd":
      return {
        ...state,
        next: canDrop(shape, grid)
          ? { delay: 0, action: "Drop" }
          : outOfRange(shape)
          ? { delay: 0, action: "EndGame" }
          : { delay: 0, action: "EndTurn" },
      };

    case "EndTurn":
      const [newGrid, evaluation] = evaluateTurn(shape, grid, state.level);
      return {
        ...state,
        next: { delay: 0, action: "NextShape" },
        grid: newGrid,
        score: score + evaluation.score,
        lines: state.lines + evaluation.lineCount,
        level: Math.floor((state.lines + evaluation.lineCount) / 10),
      };

    case "EndGame":
      return { ...state, state: "GameOver" };

    case "NextShape":
      return {
        ...state,
        shape: nextShapes[0],
        nextShapes: [
          ...nextShapes.slice(1),
          spawnShape(nextShapes.map(({ color }) => color)),
        ],
        canSwap: true,
        next: { ...state.next, action: "HandleTurn" },
      };

    default:
      return state;
  }
}
