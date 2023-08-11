import { Response } from "express";
import { StdError } from "../stderror";

export interface ResponseBody {
  data?: any;
  metadata?: any;
  error?: StdError;
}

export const ExpressResErr = (res: Response, err: StdError) => {
  var response: ResponseBody = {};
  response.error = err;
  res.status(err.status).json(response);
};

export const ExpressRes = (
  res: Response,
  code: number,
  data?: any,
  metadata?: any
) => {
  var response: ResponseBody = {};
  if (data) response.data = data;
  if (metadata) response.metadata = metadata;

  if (data || metadata) res.status(code).json(response);
  else res.status(code).end();
};

export interface StdResponse<T = undefined> {
  status?: number;
  result?: T;
  err?: StdError;
}
