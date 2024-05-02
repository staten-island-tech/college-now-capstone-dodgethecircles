import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EnemyType, PlayerType, ArrowsType } from "./interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function enemyUpdate(
  enemies: EnemyType[],
  width: number,
  height: number,
  ctx: CanvasRenderingContext2D,
  player: PlayerType | null = null
) {
  enemies = enemies.filter(
    (enemy: Enemy) =>
      !(
        enemy.x < -enemy.radius ||
        enemy.x > enemy.radius + width ||
        enemy.y < -enemy.radius ||
        enemy.y > enemy.radius + height
      )
  );
  enemies.forEach((enemy: Enemy) => {
    enemy.draw(ctx);
    enemy.update();
    player === null || player.checkGame(enemy);
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

export class Player implements PlayerType {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 10;
    this.color = "white";
    this.gameOver = false;
  }
  x: number;
  y: number;
  speed: number;
  radius: number;
  color: string;
  gameOver: boolean;

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  boundaryCheck(canvas: HTMLCanvasElement) {
    if (this.y < this.radius) {
      this.y = this.radius;
    }
    if (this.x < this.radius) {
      this.x = this.radius;
    }
    if (this.y > canvas.height - this.radius) {
      this.y = canvas.height - this.radius;
    }
    if (this.x > canvas.width - this.radius) {
      this.x = canvas.width - this.radius;
    }
  }
  checkGame(enemy: EnemyType) {
    let distance = Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2);
    return distance < this.radius + enemy.radius || this.gameOver;
  }
  inputs(arrows: ArrowsType) {
    if (arrows.ArrowDown) {
      this.y += this.speed;
    }
    if (arrows.ArrowUp) {
      this.y -= this.speed;
    }
    if (arrows.ArrowLeft) {
      this.x -= this.speed;
    }
    if (arrows.ArrowRight) {
      this.x += this.speed;
    }
  }
}
