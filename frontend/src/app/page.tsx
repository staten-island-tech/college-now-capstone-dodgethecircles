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

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

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

function Exists({ userExistsError }) {
	if (userExistsError) {
		return <p> Username Already Exists </p>;
	} else {
		return null;
	}
}
const tags = Array.from({ length: 50 }).map(
	(_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function Home() {
	const [userState, setuserState] = useState({
		username: "",
		tokens: [],
		profileImage: "https://github.com/shadcn.png", // Assuming that we are using image links
		highscore: 0,
	});

	const [loginError, setloginError] = useState("");
	const [registerError, setregisterError] = useState({
		userExistsError: false,
		miscError: false,
	});

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
		const response = await fetch("http://localhost:3000/login", {
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
		}).then((res) => {
			if (!res.ok) {
				// need to somehow show this on the form after they submit
				setloginError(res.json().message);
				// only possible error meesage is going to be invalid credentials
			} else {
				const userData = res.json();

				// Mutates State with 'userData'
				userState.username = userData.username;
				userState.tokens = userData.tokens;
				userState.highscore = userData.highscore;

				// closes dialog on submit
				setopen(false)
				loginForm.reset()
			}
		});
	}

	async function onRegister(values: z.infer<typeof registerFormSchema>) {
		const response = await fetch("http://localhost:3000/register", {
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
		}).then((res) => {
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
			} else {
				// reset userExistsError 
				setregisterError({
					...registerError,
					userExistsError: false,
				});
				const userData = res.json();

				// Mutates State with 'userData'
				userState.username = userData.username;
				userState.tokens = userData.tokens;
				userState.highscore = userData.highscore;

				// closes dialog on submit
				setopen(false)
				registerForm.reset()
			}
		});

		console.log(response); // to get rid of the message that resposne is not being used :)
	}

	const [open, setopen] = useState(false)

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
									<Dialog open={open} onOpenChange={setopen}>
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
																			<Input placeholder="shadcn" {...field} />
																		</FormControl>
																		<FormDescription>
																			This is your public display name.
																		</FormDescription>
																		<Exists
																			userExistsError={registerError.userExistsError}
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
										<Popover>
											<PopoverTrigger>
												<Avatar className="w-24 h-24">
													<AvatarImage src={userState.profileImage} />
													<AvatarFallback>CN</AvatarFallback>
												</Avatar>
											</PopoverTrigger>
											<PopoverContent>
												<div className="flex flex-col text-center h-56 w-full">
													<h5 className="text-xs mb-1">Profile Pictures</h5>
													<ScrollArea className="h-56 w-48">
														<div className="flex flex-row flex-wrap justify-evenly">
															<Avatar>
																<AvatarImage src="https://github.com/shadcn.png" />
																<AvatarFallback>CN</AvatarFallback>
															</Avatar>
															<Avatar>
																<AvatarImage src="https://github.com/shadcn.png" />
																<AvatarFallback>CN</AvatarFallback>
															</Avatar>
															<Avatar>
																<AvatarImage src="https://github.com/shadcn.png" />
																<AvatarFallback>CN</AvatarFallback>
															</Avatar>
														</div>
													</ScrollArea>
												</div>
												<div>
													<Input type="file" placeholder="Choose Proifle Image" />
												</div>
											</PopoverContent>
										</Popover>
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
