export interface Position {
  x: number;
  y: number;
}

export interface Block {
  pos: Position;
  color: string;
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
  rubble: Block[];
}
