export type BlockGrid = (string | null)[][];

export interface Position {
  x: number;
  y: number;
}

export interface WallKickTable {
  [key: string]: Position[];
}

export interface Shape {
  positions: Position[];
  color: string;
  pivot: Position;
  rotationIndex: number;
  wallKickTable: WallKickTable;
}

interface NextAction {
  delay: number;
  action: string;
}

export interface GameState {
  state: "Play" | "Pause" | "GameOver";
  shape: Shape;
  grid: BlockGrid;
  nextShapes: Shape[];
  hold?: Shape;
  canSwap: boolean;
  next: NextAction;
  score: number;
  lines: number;
  level: number;
}

export interface GameEvaluation {
  score: number;
  lineCount: number;
}

export interface Actions {
  play: () => void;
  pause: () => void;
  reset: () => void;
}
