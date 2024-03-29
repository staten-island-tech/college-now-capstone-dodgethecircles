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

// Icons
import {
  CrownIcon,
  GamepadIcon,
  UsersRoundIcon,
  TrophyIcon,
} from "lucide-react";

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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
      <div className="flex items-center justify-center h-auto w-auto bg-gradient-to-br from-black to-gray-600 p-10 rounded-lg gap-2">
        {/* Leaderboard */}
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
        </div>
        {/*  */}
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
                  <p className="text-xs">Want To Save Your High Scores?</p>
                  <div className="flex ">
                    {/* need to choose a font for these buttons looks terrible */}
                    <Button variant="link" className="text-xs">
                      Login
                    </Button>
                    <Separator orientation="vertical" />
                    <Button variant="link" className="text-xs">
                      Sign Up
                    </Button>
                  </div>
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
