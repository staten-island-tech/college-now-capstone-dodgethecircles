export type EnemyType = {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  radius: number;
  color: string;
  randomizePosition(width: number, height: number): void;
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
};

export type WhiteBlobType = {
  x: number;
  y: number;
  speed: number;
  radius: number;
  color: string;
  draw(ctx: CanvasRenderingContext2D): void;
};

export type ArrowsType = {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
};
