import mongoose from "mongoose";
import Room from "../models/room";

export const createRoom = async (req: any, res: any) => {
  try {
    const { name } = req.body;
    // create a room with the room model
    const room = await Room.create({
      players: 1,
      host: name,
      otherPlayers: [], // don't know if this is the right type
      messageType: null,
    });
    res.status(201).json(room);
  } catch (error) {
    throw error;
  }
};
