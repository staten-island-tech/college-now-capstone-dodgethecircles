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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// form
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { use, useEffect, useRef, useState } from "react";
import { Enemy, clearScreen, isNearEdge } from "@/lib/utils";
import Leaderboard from "@/app/leaderboardPage/page"

const loginFormSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});
const registerFormSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  confirmPassword: z.string().min(2).max(50),
});

// Icons
import {
  CrownIcon,
  GamepadIcon,
  UsersRoundIcon,
  TrophyIcon,
} from "lucide-react";
import { EnemyType } from "@/lib/interface";

const players = [
  { name: "Player1", highScore: 1000 },
  { name: "Player2", highScore: 950 },
  { name: "Player3", highScore: 900 },
  { name: "Player4", highScore: 850 },
  { name: "Player5", highScore: 800 },
  { name: "Player6", highScore: 750 },
  { name: "Player7", highScore: 700 },
  { name: "Player8", highScore: 650 },
  { name: "Player9", highScore: 600 },
  { name: "Player10", highScore: 550 },
];

const gameRooms = [
  { roomName: "Room 1", numberOfPlayers: 5 },
  { roomName: "Room 2", numberOfPlayers: 8 },
  { roomName: "Room 3", numberOfPlayers: 3 },
  { roomName: "Room 4", numberOfPlayers: 6 },
  { roomName: "Room 5", numberOfPlayers: 2 },
  { roomName: "Room 6", numberOfPlayers: 7 },
  { roomName: "Room 7", numberOfPlayers: 4 },
  { roomName: "Room 8", numberOfPlayers: 9 },
  { roomName: "Room 9", numberOfPlayers: 1 },
  { roomName: "Room 10", numberOfPlayers: 10 },
];

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

// relative top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"

export default function Home() {

  const [windowWidth, setWindowWidth] = useState(1920);
  const [windowHeight, setWindowHeight] = useState(1080);
  console.log(windowWidth)

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      };

      handleResize();

      window.addEventListener("resize", handleResize);
    }, []);
  // 1. Define your form.
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(
    values: z.infer<typeof loginFormSchema> | z.infer<typeof registerFormSchema>
  ) {
    // Perform form submission logic here
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  useEffect(() => {
    let canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    let view:boolean = true;
    let lastFrameTime = 0;
    const frameDuration = 1000 / 60;
    let enemies:EnemyType[] = [];
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
    requestAnimationFrame(drawGame)
    
    function enemyUpdate() {
      enemies = enemies.filter((enemy: Enemy) =>
        isNearEdge(enemy.x, enemy.y, windowWidth, windowHeight)
      );
      enemies.forEach((enemy: Enemy) => {
        enemy.draw(ctx);
        enemy.update();
      });
    }
  }, [windowHeight,windowWidth]);
  

  return (
    <main className="flex min-h-screen flex-row items-center justify-center p-24">
    <canvas id="canvas" className="absolute" width={windowWidth} height={windowHeight}></canvas>
      <div className="flex items-center justify-center h-auto w-auto bg-gradient-to-br from-black to-gray-600 p-10 rounded-lg gap-2 relative">
        <Leaderboard/>
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
                      <Tabs defaultValue="login" className="w-full mt-2">
                        <TabsList className="grid w-full grid-cols-2 ">
                          <TabsTrigger value="login">Login</TabsTrigger>
                          <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                          <Form {...loginForm}>
                            <form
                              onSubmit={loginForm.handleSubmit(onSubmit)}
                              className="space-y-8"
                            >
                              <FormField
                                control={loginForm.control}
                                name="username"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Username *</FormLabel>
                                    <FormControl>
                                      <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                      This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={loginForm.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Password *</FormLabel>
                                    <FormControl>
                                      <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                      Enter a secure password
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <p className="text-xs font-bold">
                                * required fields
                              </p>
                              <Button type="submit">Submit</Button>
                            </form>
                          </Form>
                        </TabsContent>
                        <TabsContent value="register">
                          <Form {...registerForm}>
                            <form
                              onSubmit={registerForm.handleSubmit(onSubmit)}
                              className="space-y-8"
                            >
                              <FormField
                                control={registerForm.control}
                                name="username"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Username *</FormLabel>
                                    <FormControl>
                                      <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                      This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={registerForm.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Password *</FormLabel>
                                    <FormControl>
                                      <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                      Enter a secure password
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={registerForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Confirm Password *</FormLabel>
                                    <FormControl>
                                      <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                      Confirm your password
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <p className="text-xs font-bold">
                                * required fields
                              </p>
                              <Button type="submit">Submit</Button>
                            </form>
                          </Form>
                        </TabsContent>
                      </Tabs>
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
        <div className="bg-white rounded-lg p-3 h-80 w-64">
          <h3 className="text-center text-lg underline">Game Room</h3>
          <div className="flex flex-row justify-evenly w-4/5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <GamepadIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Room Name</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <UsersRoundIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p># of Players</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ScrollArea className="h-5/6 w-full border rounded-lg">
            <div className="p-4">
              {gameRooms.map((room) => (
                <>
                  <div
                    className="flex flex-row content-baseline align items-center justify-evenly text-center"
                    key={room.roomName}
                  >
                    <h5>{room.roomName}</h5>
                    <h5>{room.numberOfPlayers}/10</h5>
                    <Button className="w-4 h-5 text-xs">Join</Button>
                  </div>
                  <Separator className="my-1" />
                </>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}
