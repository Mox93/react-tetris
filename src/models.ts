export interface Position {
  x: number;
  y: number;
}

export interface Block {
  pos: Position;
  color: string;
}

export interface Shape {
  positions: Position[];
  color: string;
  pivot: Position;
}

export interface GameState {
  shape: Shape;
  rubble: Block[];
}
