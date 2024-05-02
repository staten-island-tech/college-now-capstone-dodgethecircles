import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EnemyType, WhiteBlobType } from "./interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandom(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  let returned = Math.floor(Math.random() * (max - min + 1)) + min;
  return returned;
}

export function enemyUpdate(
  enemies: EnemyType[],
  width: number,
  height: number,
  ctx: CanvasRenderingContext2D
) {
  enemies = enemies.filter((enemy: Enemy) => {
    switch (true) {
      case enemy.x < -enemy.radius:
      case enemy.x > enemy.radius + width:
      case enemy.y < -enemy.radius:
      case enemy.y > enemy.radius + height:
        return false;
      default:
        return true;
    }
  });
  enemies.forEach((enemy: Enemy) => {
    enemy.draw(ctx);
    enemy.update();
  });
  return enemies;
}

export function clearScreen(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
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
        this.speedX = (Math.random() * width) / 200 + 0.1;
        this.speedY =
          (-1) ** getRandom(1, 2) * ((Math.random() * height) / 200 + 0.1);
        break;
      case 2:
        this.x = getRandom(0, width);
        this.y = -this.radius;
        this.speedX =
          (-1) ** getRandom(1, 2) * ((Math.random() * width) / 200 + 0.1);
        this.speedY = (Math.random() * height) / 200 + 0.1;
        break;
      case 3:
        this.x = width + this.radius;
        this.y = getRandom(0, height);
        this.speedX = -((Math.random() * width) / 200 + 0.1);
        this.speedY =
          (-1) ** getRandom(1, 2) * ((Math.random() * height) / 200 + 0.1);
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
