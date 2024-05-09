"use client";
import { Enemy, clearScreen, enemyUpdate, Player } from "@/lib/utils";
import { EnemyType, PlayerType } from "@/lib/interface";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function SinglePlayer() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  let player: PlayerType = {
    x: 500,
    y: 300,
    radius: 15,
    speed: 7,
    color: "grey",
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D = canvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    let lastFrameTime = 0;
    let enemies: EnemyType[] = [];

    setInterval(
      () =>
        document.visibilityState === "visible"
          ? enemies.push(new Enemy(10, width, height))
          : null,
      canvas.width / 10
    );

    function drawGame(timestamp: number) {
      requestAnimationFrame(drawGame);
      const deltaTime = timestamp - lastFrameTime;
      if (deltaTime < 1000 / 60 || document.visibilityState !== "visible")
        return;
      clearScreen(ctx, canvas);
      enemies = enemyUpdate(enemies, width, height, ctx);
      lastFrameTime = timestamp;
    }
    requestAnimationFrame(drawGame);
  }, [height, width]);
  return (
    <div>
      <canvas
        id="canvas"
        className="absolute"
        width={width}
        height={height}
      ></canvas>
      <div className="topBar grid grid-areas-score-click-home">
        <h1 id="score" className="ml-4 text-2xl inline-block">
          Points: 0
        </h1>
        <h2 className="click inline-block text-2.25rem">Click to Start</h2>

        <Link
          href="/"
          className="flex justify-center content-center relative top-0 left-[95%] home-button  w-8 h-8  border-2 border-solid border-gray-700 rounded-s text-18px text-gray-700  "
        >
          <Home />
        </Link>
      </div>
      <div className="container m-auto mt-4"></div>
    </div>
  );
}
