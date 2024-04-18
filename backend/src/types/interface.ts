import { Request } from "express";
export interface ReqFile {
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
}
export interface MulterReq extends Request {
  file: ReqFile;
}

export interface ReturnData {
  username: string;
  tokens: { token: string }[];
}
