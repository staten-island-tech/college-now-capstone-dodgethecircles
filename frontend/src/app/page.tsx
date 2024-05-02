"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Enemy, clearScreen, enemyUpdate } from "@/lib/utils";
import Leaderboard from "@/components/custom/leaderboard";
import { TrophyIcon } from "lucide-react";
import { EnemyType } from "@/lib/interface";
import { Button } from "@/components/ui/button";
import GameList from "@/components/custom/gamelist";
import Login from "@/components/custom/login";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function Home() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);

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
    <main className="flex min-h-screen flex-row items-center justify-center p-24">
      <canvas
        id="canvas"
        className="absolute"
        width={width}
        height={height}
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
                    <a href="solo">
                      <Button className="bg-slate-700">SinglePlayer</Button>
                    </a>
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
