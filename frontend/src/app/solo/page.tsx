"use client";
import { Enemy, clearScreen, isNearEdge } from "@/lib/utils";
import { EnemyType } from "@/lib/interface";
import { useEffect, useState } from "react";

export default function SinglePlayer() {
  const [windowWidth, setWindowWidth] = useState(1920);
  const [windowHeight, setWindowHeight] = useState(1080);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);
  // 1. Define your form.

  // 2. Define a submit handler.

  useEffect(() => {
    let canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D = canvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    let view: boolean = true;
    let lastFrameTime = 0;
    const frameDuration = 1000 / 60;
    let enemies: EnemyType[] = [];
    function getEnemies() {
      enemies.push(new Enemy(10, windowWidth, windowHeight));
      // enemies = enemies.sort((a, b) => b.radius - a.radius);
    }
    setInterval(getEnemies, canvas.width / 10);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "visible") {
        view = true;
      } else {
        view = false;
      }
    });
    function drawGame(timestamp: number) {
      requestAnimationFrame(drawGame);
      const deltaTime = timestamp - lastFrameTime;

      if (deltaTime >= frameDuration) {
        if (!view) return;
        clearScreen(ctx, canvas);
        enemyUpdate();
        lastFrameTime = timestamp;
      }
    }
    requestAnimationFrame(drawGame);

    function enemyUpdate() {
      enemies = enemies.filter((enemy: Enemy) =>
        isNearEdge(enemy.x, enemy.y, windowWidth, windowHeight)
      );
      enemies.forEach((enemy: Enemy) => {
        enemy.draw(ctx);
        enemy.update();
      });
    }
  }, [windowHeight, windowWidth]);
  return (
    <div>
      <canvas
        id="canvas"
        className="absolute"
        width={windowWidth}
        height={windowHeight}
      ></canvas>
      <div className="topBar grid grid-areas-score-click-home">
        <h1 id="score" className="ml-4 text-2xl inline-block">
          Points: 0
        </h1>
        <h2 className="click inline-block text-2.25rem">Click to Start</h2>
        <a href="/">
          <button className="home-button mr-2 mt-0.5 float-right w-16 h-16 inline-block px-10 py-20 border-2 border-solid border-gray-700 rounded-full text-center text-18px text-gray-700 no-underline transition-all duration-200 ease-in-out relative">
            <i className="fas fa-home font-FontAwesome inline-block mr-12 text-25px"></i>
          </button>
        </a>
      </div>
      <div className="container m-auto mt-4"></div>
    </div>
  );
}
