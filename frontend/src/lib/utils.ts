import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EnemyType, WhiteBlobType, PlayerType, ArrowsType } from "./interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandom(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  let returned = Math.floor(Math.random() * (max - min + 1)) + min;
  return returned;
}

export function isCanvasVisible(canvas: HTMLCanvasElement) {
  let isVisible = true;

  // Check if the Page Visibility API is supported
  if (typeof document.visibilityState !== "undefined") {
    isVisible = document.visibilityState === "visible";
  }

  // Check if the element is in the viewport
  if (isVisible) {
    let boundingRect = canvas.getBoundingClientRect();
    isVisible =
      boundingRect.top >= 0 &&
      boundingRect.left >= 0 &&
      boundingRect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      boundingRect.right <=
        (window.innerWidth || document.documentElement.clientWidth);
  }

  return isVisible;
}

export function clearScreen(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
}

export function isNearEdge(
  x: number,
  y: number,
  width: number,
  height: number
): boolean {
  switch (true) {
    case x < -100:
    case x > width + 100:
    case y < -100:
    case y > height + 100:
      return false;
    default:
      return true;
  }
}

export function genText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string
) {
  ctx.font = "120px robotto";
  ctx.fillStyle = "red";
  ctx.fillText(`${text}`, x, y);
}

export function isClickOnCanvas(event: MouseEvent, canvas: HTMLCanvasElement) {
  let x = event.clientX;
  let y = event.clientY;
  let canvasRect = canvas.getBoundingClientRect();
  return (
    x >= canvasRect.left &&
    x <= canvasRect.right &&
    y >= canvasRect.top &&
    y <= canvasRect.bottom
  );
}

export function checkGame(
  enemy: Enemy,
  value: boolean,
  whiteBlob: WhiteBlobType
) {
  let distance = Math.sqrt(
    (whiteBlob.x - enemy.x) ** 2 + (whiteBlob.y - enemy.y) ** 2
  );
  if (distance < whiteBlob.radius + enemy.radius || value) {
    return true;
  }
}

export function drawWhiteBlob(
  whiteBlob: WhiteBlobType,
  ctx: CanvasRenderingContext2D
) {
  ctx.fillStyle = "white";
  ctx.beginPath(); // starts circle
  ctx.arc(whiteBlob.x, whiteBlob.y, whiteBlob.radius, 0, Math.PI * 2); // x,y , radius, start angle, end angle.
  ctx.fill();
}

export function whiteBlobBoundry(
  whiteBlob: WhiteBlobType,
  canvas: HTMLCanvasElement
) {
  if (whiteBlob.y < whiteBlob.radius) {
    whiteBlob.y = whiteBlob.radius;
  }
  if (whiteBlob.x < whiteBlob.radius) {
    whiteBlob.x = whiteBlob.radius;
  }
  if (whiteBlob.y > canvas.height - whiteBlob.radius) {
    whiteBlob.y = canvas.height - whiteBlob.radius;
  }
  if (whiteBlob.x > canvas.width - whiteBlob.radius) {
    whiteBlob.x = canvas.width - whiteBlob.radius;
  }
  return whiteBlob;
}

export class Enemy implements EnemyType {
  constructor(mult: number, width: number, height: number) {
    this.x = 0;
    this.y = 0;
    this.speedX = 0;
    this.speedY = 0;

    if (mult < 50) {
      this.radius = getRandom(10 + mult, 50 + mult);
    } else {
      this.radius = getRandom(60, 110);
    }
    this.color = `rgb(
        ${getRandom(50, 220)},
        ${getRandom(50, 220)},
        ${getRandom(50, 220)})`;
    this.randomizePosition(width, height);
  }
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  radius: number;
  color: string;

  randomizePosition(width: number, height: number) {
    const ran = getRandom(1, 4);
    switch (ran) {
      case 1:
        this.x = -this.radius;
        this.y = getRandom(0, height);
        this.speedX = (Math.random() * width) / 300 + 0.1;
        this.speedY =
          (-1) ** getRandom(1, 2) * ((Math.random() * height) / 300 + 0.1);
        break;
      case 2:
        this.x = getRandom(0, width);
        this.y = -this.radius;
        this.speedX =
          (-1) ** getRandom(1, 2) * ((Math.random() * width) / 300 + 0.1);
        this.speedY = (Math.random() * height) / 200 + 0.1;
        break;
      case 3:
        this.x = width + this.radius;
        this.y = getRandom(0, height);
        this.speedX = -((Math.random() * width) / 300 + 0.1);
        this.speedY =
          (-1) ** getRandom(1, 2) * ((Math.random() * height) / 300 + 0.1);
        break;
      case 4:
        this.x = getRandom(0, width);
        this.y = height + this.radius;
        this.speedX =
          (-1) ** getRandom(1, 2) * ((Math.random() * width) / 200 + 0.1);
        this.speedY = -((Math.random() * height) / 200 + 0.1);
    }
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export function enemyUpdate(
  enemies: EnemyType[],
  width: number,
  height: number,
  ctx: CanvasRenderingContext2D,
  player: PlayerType | null = null,
  setPoints: ((value: number) => void) | null = null,
  points: number | null = null
): EnemyType[] {
  let score = 0;
  enemies = enemies.filter((enemy: Enemy) => {
    if (
      enemy.x < -enemy.radius ||
      enemy.x > enemy.radius + width ||
      enemy.y < -enemy.radius ||
      enemy.y > enemy.radius + height
    )
      return false;
    enemy.draw(ctx);
    enemy.update();
    player === null || (score += player.checkGame(enemy));
    return enemy.radius > 0;
  });

  return enemies;
}

export class Arrows implements ArrowsType {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
  constructor() {
    this.ArrowUp = false;
    this.ArrowDown = false;
    this.ArrowLeft = false;
    this.ArrowRight = false;
  }
  keyDown(i: KeyboardEvent) {
    this[i.key as keyof ArrowsType] = true;
  }

  keyUp(i: KeyboardEvent) {
    this[i.key as keyof ArrowsType] = false;
  }
}

export class Player implements PlayerType {
  constructor(canvas: HTMLCanvasElement) {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.speed = canvas.width / 200;
    this.radius = canvas.width / 50;
    this.color = "gray";
    this.gameOver = false;
  }
  x: number;
  y: number;
  speed: number;
  radius: number;
  color: string;
  gameOver: boolean;
  checkGame(enemy: EnemyType): number {
    const distance = Math.sqrt(
      (this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2
    );
    if (enemy.radius < this.radius && distance < this.radius + enemy.radius) {
      this.radius += 0.2;
      enemy.radius = 0;
      return 1;
    }
    this.gameOver = distance < this.radius + enemy.radius || this.gameOver;
    return 0;
  }
  update(
    arrows: ArrowsType,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    if (arrows.ArrowDown) this.y += this.speed;
    if (arrows.ArrowUp) this.y -= this.speed;
    if (arrows.ArrowLeft) this.x -= this.speed;
    if (arrows.ArrowRight) this.x += this.speed;
    if (this.y < this.radius) this.y = this.radius;
    if (this.x < this.radius) this.x = this.radius;
    if (this.y > canvas.height - this.radius)
      this.y = canvas.height - this.radius;
    if (this.x > canvas.width - this.radius)
      this.x = canvas.width - this.radius;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
