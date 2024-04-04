import { Request } from "express";

export interface MulterReq extends Request {
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
    stream: any;
    destination: any;
    filename: any;
    path: any;
  };
}
