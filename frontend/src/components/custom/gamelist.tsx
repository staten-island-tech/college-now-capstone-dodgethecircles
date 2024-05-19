import { GamepadIcon, UsersRoundIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";

export default function gamelist() {
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
    
    return (<div className="bg-white rounded-lg p-3 h-80 w-64">
    <h3 className="text-center text-lg underline">Game Room</h3>
    <div className="flex flex-row justify-evenly w-4/5 mt-1">
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
  </div>)
}
