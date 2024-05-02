import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CrownIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { PlayerType } from "@/lib/interface";

export default function Leaderboard() {
  const [players, setPlayers] =  useState<PlayerType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(`${process.env.BACKEND_URL}/leaderboard`).then((res) => res.json());
        setPlayers(await data);
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
    <div className="grid w-full grid-cols-3 items-center text-center">
      {/* fix this grid */}
      <h4>Rank</h4>
      <h4>Player</h4>
      <h4>Score</h4>
    </div>
    <ScrollArea className="rounded-lg border h-5/6 w-full">
      <div className="p-4">
        {/* Top 3 */}
        {
          players.length > 0 ?
          <div
            id="1st"
            className="flex flex-row content-baseline align items-center justify-evenly"
          >
            <div className="flex flex-col justify-center w-6">
              <CrownIcon color="gold" />
            </div>
            <Avatar>
              <AvatarImage src={players[2].profilePicture || "@/public/default_pfp.svg"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h4>{players[0].username}</h4>
            <h4>{players[0].highscore}</h4>
          </div>
          :null
        }
        {
          players.length > 1 ?
          <span>
            <Separator className="my-1" />
            <div
              id="2nd"
              className="flex flex-row content-baseline align items-center justify-evenly"
              >
              <div className="flex flex-col justify-center w-6">
                <CrownIcon color="silver" />
              </div>
              <Avatar>
                <AvatarImage src={players[2].profilePicture || "@/public/default_pfp.svg"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h4>{players[1].username}</h4>
              <h4>{players[1].highscore}</h4>
            </div>
          </span>
          :null
        }
        {
          players.length > 2 ?
          <span>
            <Separator className="my-1" />
            <div
              id="3rd"
              className="flex flex-row content-baseline align items-center justify-evenly"
              >
              <div className="flex flex-col justify-center w-6">
                <CrownIcon color="brown" />
              </div>
              <Avatar>
                <AvatarImage src={players[2].profilePicture || "@/public/default_pfp.svg"}  />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h4>{players[2].username}</h4>
              <h4>{players[2].highscore}</h4>
            </div>
          </span>
          :null
        }
        {/*  */}
        {/* Everyone Else */}
        {players.slice(3).map((player, index) => (
          <>
            <Separator className="my-1" />
            <div
              key={player.username}
              className="flex flex-row content-baseline align items-center justify-evenly text-center"
            >
              <div className="flex flex-col justify-center w-6">
                <h4>{index + 4}</h4>
              </div>

              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/300" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h2>{player.username}</h2>
              <p>{player.highscore}</p>
            </div>
          </>
        ))}
      </div>
    </ScrollArea>
  </div>);
}