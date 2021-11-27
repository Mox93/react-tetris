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

export interface GameState {
  shape: Shape;
  grid: BlockGrid;
  nextShapes: Shape[];
  hold?: Shape;
  canSwap: boolean;
  score: number;
  lines: number;
  level: number;
}

export interface GameEvaluation {
  score: number;
  lineCount: number;
}
