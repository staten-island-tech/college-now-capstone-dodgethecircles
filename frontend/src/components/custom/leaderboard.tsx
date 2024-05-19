import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CrownIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { PlayerType } from "@/lib/interface";

export default function Leaderboard() {
	const [players, setPlayers] = useState<PlayerType[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await fetch("http://localhost:8080/leaderboard").then(async (res) => {
					return await res.json();
				});
				setPlayers(data);
			} catch (error) {
				console.error(error);
			}
		}

		fetchData();
	}, []);

	return (
		<div className="bg-white rounded-lg p-3 h-80 w-64">
			<h3 className="text-center bold underline">Leaderboard</h3>
			{/* font and some typography stuff for this h3 ^ */}
			<div className="grid w-full grid-cols-3 items-center text-center mt-1">
				{/* fix this grid */}
				<h4>Rank</h4>
				<h4>Player</h4>
				<h4>Score</h4>
			</div>
			<ScrollArea className="rounded-lg border h-5/6 w-full">
				<div className="mt-1 w-full">
					{/* Top 3 */}
					{players.length > 0 ? (
						<div className="grid w-full grid-cols-3 items-center text-center">
							<div className="relative w-full flex justify-center items-center">
								<div className="absolute inset-0 flex justify-center items-center z-10">
									<CrownIcon color="gold" />
								</div>
								<Avatar className="opacity-80 mx-auto">
									<AvatarImage src={"" || "@/public/default_pfp.svg"} />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</div>
							<h4 className="text-base w-full overflow-hidden whitespace-nowrap text-ellipsis">{players[0].username}</h4>
							<h4 className="text-base w-full overflow-hidden whitespace-nowrap text-ellipsis">{players[0].highscore}	</h4>
						</div>
					) : null}
					{players.length > 1 ? (
						<span>
							<Separator className="my-1" />
							<div className="grid w-full grid-cols-3 items-center text-center">
								<div className="relative w-full flex justify-center items-center">
									<div className="absolute inset-0 flex justify-center items-center z-10">
										<CrownIcon color="silver" />
									</div>
									<Avatar className="opacity-80 mx-auto">
										<AvatarImage src={"" || "@/public/default_pfp.svg"} />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</div>
								<h4 className="text-base w-full overflow-hidden whitespace-nowrap text-ellipsis">{players[1].username}</h4>
								<h4 className="text-base w-full overflow-hidden whitespace-nowrap text-ellipsis">{players[1].highscore}	</h4>
							</div>
						</span>
					) : null}
					{players.length > 2 ? (
						<span>
							<Separator className="my-1" />
							<div className="grid w-full grid-cols-3 items-center text-center">
								<div className="relative w-full flex justify-center items-center">
									<div className="absolute inset-0 flex justify-center items-center z-10">
										<CrownIcon color="brown" />
									</div>
									<Avatar className="opacity-80 mx-auto">
										<AvatarImage src={"https://i.pravatar.cc/300" || "@/public/default_pfp.svg"} />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</div>
								<h4 className="text-base w-full overflow-hidden whitespace-nowrap text-ellipsis">{players[2].username}</h4>
								<h4 className="text-base w-full overflow-hidden whitespace-nowrap text-ellipsis">{players[2].highscore}	</h4>
							</div>
						</span>
					) : null}
					{/*  */}
					{/* Everyone Else */}
					{players.slice(3).map((player, index) => (
						<>
							<Separator className="my-1" />
							<div className="grid w-full grid-cols-3 items-center text-center">
								<div className="relative w-full flex justify-center items-center">
									<div className="absolute inset-0 flex justify-center items-center z-10">
										<h4 className="font-bold text-center mr-1" >{index + 4}</h4>
									</div>
									<Avatar className="opacity-80 mx-auto">
										<AvatarImage src={"https://i.pravatar.cc/300" || "@/public/default_pfp.svg"} />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</div>
								<h4 className="text-base w-full overflow-hidden whitespace-nowrap text-ellipsis">{player.username}</h4>
								<h4 className="text-base w-full overflow-hidden whitespace-nowrap text-ellipsis">{player.highscore}	</h4>
							</div>
						</>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
