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
  pfp: String;
  tokens: string[];
  _id: string;
};

export type UserStateType = {
  username: string;
  authorizationToken: string[];
  highscore: number;
  authenticated: boolean;
  profileImage: string;
  differentImageSrc: string;
  differentImageFile: File;
  otherProfileImages: string[];
  _id: string;
};

export type WhiteBlobType = {
  x: number;
  y: number;
  speed: number;
  radius: number;
  color: string;
  draw(ctx: CanvasRenderingContext2D): void;
};
