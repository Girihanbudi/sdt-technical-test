import { Request, Response } from "express";
import { ISendMailRequest } from "../../preset";
import { ExpressRes, ExpressResErr } from "../../../pkg/stdresponse";
import { SendMail } from "../../usecase";

export const sendMailApi = async (
  req: Request<ISendMailRequest>,
  res: Response
) => {
  const { result, err } = await SendMail(req.body);
  if (err) ExpressResErr(res, err);
  else ExpressRes(res, 200, result);
};
