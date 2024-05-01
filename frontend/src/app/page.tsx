"use client";

// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// form

import { use, useEffect, useRef, useState } from "react";
import { Enemy, clearScreen, isNearEdge } from "@/lib/utils";
import Leaderboard from "@/components/custom/leaderboard";

// Icons
import { TrophyIcon } from "lucide-react";
import { EnemyType } from "@/lib/interface";
import { Button } from "@/components/ui/button";
import GameList from "@/components/custom/gamelist";
import Login from "@/components/custom/login";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

// relative top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(1920);
  const [windowHeight, setWindowHeight] = useState(1080);
  console.log(windowWidth);

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
    <main className="flex min-h-screen flex-row items-center justify-center p-24">
      <canvas
        id="canvas"
        className="absolute"
        width={windowWidth}
        height={windowHeight}
      ></canvas>
      <div className="flex items-center justify-center h-auto w-auto bg-gradient-to-br from-black to-gray-600 p-10 rounded-lg gap-2 relative">
        <Leaderboard />
        <div className="bg-white rounded-lg p-3 w-80 h-96">
          {/*  */}
          <Tabs defaultValue="play" className="w-full">
            {/*  */}
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="play">Play</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            {/*  */}
            <TabsContent value="play" className="h-[312px]">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>CHOOSE A GAMEMODE</CardTitle>
                  {/* need to choose a font for this it looks terrible */}
                </CardHeader>
                <CardContent className="flex justify-center flex-col">
                  <Input
                    type="name"
                    placeholder="Enter A Name"
                    className="mb-4"
                  />
                  <div className="grid w-full grid-cols-2 gap-1">
                    <Button className="bg-slate-700">SinglePlayer</Button>
                    <Button className="bg-slate-700">MultiPlayer</Button>
                  </div>
                </CardContent>
                <Separator className="my-1" />
                <CardFooter className="flex flex-col justify-center p-1 mt-3">
                  <p className="text-xs mb-1">Want To Save Your High Scores?</p>
                  <Dialog>
                    <DialogTrigger className="text-sm hover:text-purple-900 ">
                      Login / Register
                    </DialogTrigger>
                    <DialogContent>
                      <Login />
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </TabsContent>
            {/*  */}
            <TabsContent value="profile" className="h-[312px]">
              <Card className="h-full">
                <CardContent>
                  <div className="flex justify-center w-full mt-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex justify-center w-full h-28 mt-3 items-center rounded-md border-2 border-dashed text-sm">
                    <h5 className="text-sm">Upload Profile Picture</h5>
                    {/* change this font and add functionality */}
                  </div>
                  <div className="flex justify-evenly w-full mt-4">
                    <TrophyIcon />
                    <TrophyIcon />
                    <TrophyIcon />
                    <TrophyIcon />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/*  */}
          </Tabs>
          {/*  */}
        </div>
        <GameList />
      </div>
    </main>
  );
}
