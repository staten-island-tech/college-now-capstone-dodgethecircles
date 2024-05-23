"use client";
import { Enemy, clearScreen, enemyUpdate, Player, Arrows } from "@/lib/utils";
import { EnemyType, UserType } from "@/lib/interface";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SinglePlayer() {
  const router = useRouter();
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [points, setPoints] = useState(0);
  let requestId: number;
  console.log(router);
  let { user } = router.query as UserType;
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    let canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D = canvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    let lastFrameTime = 0;
    let enemies: EnemyType[] = [];
    let player = new Player(canvas);
    let arrows = new Arrows();

    document.body.addEventListener("keydown", (event) => arrows.keyDown(event));
    document.body.addEventListener("keyup", (event) => arrows.keyUp(event));

    setInterval(
      () =>
        document.visibilityState === "visible" && !player.gameOver
          ? enemies.push(new Enemy(10, width, height))
          : null,
      canvas.width / 10
    );

    function drawGame(timestamp: number) {
      cancelAnimationFrame(requestId);
      requestId = requestAnimationFrame(drawGame);
      const deltaTime = timestamp - lastFrameTime;
      console.log(user);
      if (player.gameOver && user.highscore < player.points) {
        user.highscore = player.points;
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.tokens[0]}`,
          },
          body: JSON.stringify({ score: user.highscore }),
        }).catch((err) => console.log(err));

        return;
      }
      if (deltaTime < 1000 / 60 || document.visibilityState !== "visible")
        return;
      clearScreen(ctx, canvas);
      enemies = enemyUpdate(enemies, width, height, ctx, player);
      setPoints(player.points);
      player.update(arrows, canvas, ctx);
      lastFrameTime = timestamp;
    }
    drawGame(0);
    window.addEventListener("click", () => {
      if (!player.gameOver) return;
      player.gameOver = false;
      player = new Player(canvas);
      arrows = new Arrows();
      enemies = [];
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(requestId);
    };
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
        <h1 id="score" className="ml-4 text-2xl absolute">
          Points: {points}
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
