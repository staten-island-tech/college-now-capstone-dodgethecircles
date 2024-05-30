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
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// form
import { any, set, z } from "zod";
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
import Leaderboard from "@/components/custom/leaderboard";

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});
const registerFormSchema = z.object({
  username: z.string().min(6).max(50),
  password: z.string().min(8).max(50),
  confirmPassword: z.string().min(8).max(50),
});

// Icons
import { TrophyIcon } from "lucide-react";
import { EnemyType } from "@/lib/interface";
import { Button } from "@/components/ui/button";
import GameList from "@/components/custom/gamelist";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { argv0 } from "process";
import { UserType, UserStateType } from "@/lib/interface";
import { enemyUpdate } from "@/lib/utils";
import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice";

function Exists({ error, message }: { error: Error; message: string }) {
  if (error) {
    return <p className="text-red-500 text-sm"> {message} </p>;
  } else {
    return null;
  }
}
const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const [userState, setUserState]: [UserStateType, Function] = useState({
    username: "",
    _id: "",
    authorizationToken: [],
    profileImage: `${process.env.NEXT_PUBLIC_BACKEND_URL}/pfp/default_pfp.svg`, // Assuming that we are using image links
    highscore: 0,
    differentImageSrc: "",
    differentImageFile: {} as File,
    otherProfileImages: [],
    authenticated: false, // change this when done with testing back to false
  });

  const [loginError, setloginError] = useState("");
  const [registerError, setregisterError] = useState({
    userExistsError: false,
    miscError: false,
    passwordMismatchError: false,
  });

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
  async function onLogin(values: z.infer<typeof loginFormSchema>) {
    try {
      setopen(false);
      loginForm.reset();
    } catch (err: Error) {
      setloginError(err.message);
    }
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(values), // body data type must match "Content-Type" header
    })
      .then(async (res) => {
        const data = await res.json();

        const userData: UserType = data;

        userState.username = userData.username;
        userState.authorizationToken = userData.tokens;
        userState.highscore = userData.highscore;
        userState.authenticated = true;
        userState._id = userData._id;
        // closes dialog on submit
        setopen(false);
        loginForm.reset();
      })
      .catch((err) => {
        setloginError("Username or Password is incorrect");
      });
  }

  async function onRegister(values: z.infer<typeof registerFormSchema>) {
    // need to actually check the values of confirm pasword and password
    if (values.password !== values.confirmPassword) {
      setregisterError({ ...registerError, passwordMismatchError: true });
      return;
    }

    const userObject = {
      username: values.username,
      password: values.password,
    };
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(userObject), // body data type must match "Content-Type" header
    }).then(async (res) => {
      if (!res.ok) {
        // don't need to handle user/pass len error since form has min len
        // possible error message is username < 6
        // possible error message is password < 8

        // username already exists
        if (res.status === 401) {
          setregisterError({
            ...registerError,
            userExistsError: true,
          });
        } else {
          // error message from the catch hook
          console.log(res.json());
        }
        return;
      }
      // reset userExistsError
      setregisterError({
        ...registerError,
        userExistsError: false,
      });
      const userData: UserType = await res.json();
      // Mutates State with 'userData'
      userState.username = userData.username;
      userState.authorizationToken = userData.tokens;
      userState.highscore = userData.highscore;
      userState.authenticated = true;

      // closes dialog on submit
      setopen(false);
      registerForm.reset();
      setRefreshLeaderboard(refreshLeaderboard + 1);
    });
  }

  function handleProfileImageChange(imageFile: File) {
    setUserState({
      ...userState,
      differentImageFile: imageFile,
      //@ts-ignore
      differentImageSrc: URL.createObjectURL(imageFile.target.files[0]),
    });
  }
  function resetProfileImage() {
    setUserState({
      ...userState,
      differentImageFile: {},
      differentImageSrc: "",
    });
  }

  async function uploadFile() {
    const fileForm = new FormData();
    //@ts-ignore
    fileForm.append("file", userState.differentImageFile.target.files[0]);

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        authorization: `Bearer ${userState.authorizationToken[0]}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
        contentType: "multipart/form-data",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: fileForm, // body data type must match "Content-Type" header
    }).then((res) => {
      if (!res.ok) {
        return;
      }
      setRefreshLeaderboard(refreshLeaderboard + 1);
      userState.profileImage = userState.differentImageSrc;
    });
  }
  const [isOpen, setopen] = useState(false);
  const [refreshLeaderboard, setRefreshLeaderboard] = useState(0);

  useEffect(() => {
    let canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D = canvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    let view: boolean = true;
    let lastFrameTime = 0;
    let enemies: EnemyType[] = [];
    function getEnemies() {
      enemies.push(new Enemy(10, width, height));
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
        <Leaderboard key={refreshLeaderboard} />
        <div className="bg-white rounded-lg p-3 w-80 h-96">
          {/*  */}
          <Tabs defaultValue="play" className="w-full">
            {/*  */}
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="play">Play</TabsTrigger>
              <TabsTrigger value="profile" disabled={!userState.authenticated}>
                Profile
              </TabsTrigger>
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
                  <div className="flex justify center">
                    <Link
                      className="w-1/2"
                      href={{
                        pathname: "/solo",
                        query: {
                          user: JSON.stringify(userState),
                        },
                      }}
                    >
                      <Button className="bg-slate-700">SinglePlayer</Button>
                    </Link>
                    <Link
                      className="inline"
                      href={{
                        pathname: "/",
                        query: {
                          user: Object.create(userState),
                        },
                      }}
                    >
                      <Button className="bg-slate-700">MultiPlayer</Button>
                    </Link>
                  </div>
                </CardContent>
                <Separator className="my-1" />
                <CardFooter className="flex flex-col justify-center p-1 mt-3">
                  <p className="text-xs mb-1">Want To Save Your High Scores?</p>
                  <Dialog open={isOpen} onOpenChange={setopen}>
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
                              onSubmit={loginForm.handleSubmit(onLogin)}
                              className="space-y-8"
                            >
                              <FormField
                                control={loginForm.control}
                                name="username"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Username *</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="username"
                                        {...field}
                                      />
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
                                      <Input
                                        placeholder="password"
                                        type="password"
                                        autoComplete="password"
                                        {...field}
                                      />
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
                              onSubmit={registerForm.handleSubmit(onRegister)}
                              className="space-y-8"
                            >
                              <FormField
                                control={registerForm.control}
                                name="username"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Username *</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="username"
                                        autoComplete="username"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      This is your public display name.
                                    </FormDescription>
                                    <Exists
                                      //@ts-ignore
                                      error={registerError.userExistsError}
                                      message="Username Already Exists"
                                    />
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
                                      <Input
                                        autoComplete="new-password"
                                        placeholder="password"
                                        type="password"
                                        {...field}
                                      />
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
                                      <Input
                                        autoComplete="confirm-password"
                                        placeholder="password"
                                        type="password"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Confirm your password
                                    </FormDescription>
                                    <Exists
                                      //@ts-ignore
                                      error={
                                        registerError.passwordMismatchError
                                      }
                                      message="Passwords Do Not Match"
                                    />
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
                    <Popover>
                      <PopoverTrigger>
                        <Avatar className="w-24 h-24">
                          <AvatarImage
                            src={
                              userState.differentImageSrc
                                ? userState.differentImageSrc
                                : userState.profileImage
                            }
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </PopoverTrigger>
                      <PopoverContent
                        onCloseAutoFocus={() =>
                          setUserState({ ...userState, differentImageSrc: "" })
                        }
                      >
                        <div className="flex flex-col text-center h-56 w-full">
                          <h5 className="text-xs mb-1">Profile Pictures</h5>
                          <ScrollArea className="h-56 w-48">
                            <div>
                              {userState.otherProfileImages.map((images) => (
                                <>
                                  <div>
                                    <Avatar>
                                      <AvatarImage src={images} />
                                      <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                  </div>
                                </>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                        <div>
                          <Input
                            //@ts-ignore
                            onChange={(e) => handleProfileImageChange(e)}
                            type="file"
                            placeholder="Choose Proifle Image"
                          />
                          <div className="flex flex-row mt-1 w-full justify-evenly">
                            <Button
                              className="bg-green-400 text-xs w-[48%]"
                              variant="secondary"
                              onClick={uploadFile}
                            >
                              Set Profile Image
                            </Button>
                            <Button
                              className="text-xs w-[48%]"
                              variant="destructive"
                              onClick={resetProfileImage}
                            >
                              Reset Profile Image
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex justify-evenly w-full mt-4">
                    <h5>Achievements</h5>
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
