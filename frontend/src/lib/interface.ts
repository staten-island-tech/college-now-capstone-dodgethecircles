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

export type PlayerType = {
  x: number;
  y: number;
  speed: number;
  radius: number;
  color: string;
  gameOver: boolean;
  draw(ctx: CanvasRenderingContext2D): void;
  boundaryCheck(canvas: HTMLCanvasElement): void;
  checkGame(enemy: EnemyType): void;
};

export type ArrowsType = {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
};

export type UserType = {
  username: string;
  highscore: number;
  profilePicture: ImageBitmap;
};
