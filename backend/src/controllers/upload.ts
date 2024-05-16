import { Request, Response, NextFunction } from "express";
import File from "../models/file";
import User from "../models/user";
import { v4 as uuidv4 } from "uuid";
import { MulterReq } from "../types/interface";

export const createFile = async (
	req: MulterReq,
	res: Response,
	next: NextFunction,
) => {
	const user = await User.findOne({ tokens: req.headers.authorization });
	console.log(user)
	if (!user) {
		console.log("user")
		res.json({ success: false, msg: "Invalid token" });
		return;
	} else if (req.body.name) {
		console.log("name")
		res.send({ success: false, msg: "Please pass a name" });
		return;
	}
	console.log(req.file);
	const path = uuidv4();
	req.file.filename = path + req.file.filename.split(".")[1];
	try {
		console.log(req.headers.authorization);

		const file = new File({
			name: "hi",
			location: `uploads`,
		});
		await file.save();
		res.json({
			success: true,
			msg: "File uploaded successfully",
		});
	} catch (error) {
		res.json({
			success: false,
			msg: error,
		});
	}
	next()
};
