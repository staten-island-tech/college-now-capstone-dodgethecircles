import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { CrownIcon } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import { ScrollArea } from "../../components/ui/scroll-area";

export default function Leaderboard() {
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
        <div
          id="1st"
          className="flex flex-row content-baseline align items-center justify-evenly"
        >
          <div className="flex flex-col justify-center w-6">
            <CrownIcon color="gold" />
          </div>
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/300" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h4>{players[0].name}</h4>
          <h4>{players[0].highScore}</h4>
        </div>
        <Separator className="my-1" />
        <div
          id="2nd"
          className="flex flex-row content-baseline align items-center justify-evenly"
        >
          <div className="flex flex-col justify-center w-6">
            <CrownIcon color="silver" />
          </div>
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/300" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h4>{players[1].name}</h4>
          <h4>{players[1].highScore}</h4>
        </div>
        <Separator className="my-1" />
        <div
          id="3rd"
          className="flex flex-row content-baseline align items-center justify-evenly"
        >
          <div className="flex flex-col justify-center w-6">
            <CrownIcon color="brown" />
          </div>
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/300" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h4>{players[2].name}</h4>
          <h4>{players[2].highScore}</h4>
        </div>
        {/*  */}
        {/* Everyone Else */}
        {players.slice(3).map((player, index) => (
          <>
            <Separator className="my-1" />
            <div
              key={player.name}
              className="flex flex-row content-baseline align items-center justify-evenly text-center"
            >
              <div className="flex flex-col justify-center w-6">
                <h4>{index + 4}</h4>
              </div>

              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/300" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h2>{player.name}</h2>
              <p>{player.highScore}</p>
            </div>
          </>
        ))}
      </div>
    </ScrollArea>
  </div>);
}