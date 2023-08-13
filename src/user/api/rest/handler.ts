import { Request, Response } from "express";
import {
  IGetUserRequest,
  ICreateUserRequest,
  IUpdateUserRequest,
  IDeleteUserRequest,
} from "../../preset";
import { ExpressRes, ExpressResErr } from "../../../pkg/stdresponse";
import { getUser, createUser, updateUser, deleteUser } from "../../usecase";

export const getUserApi = async (
  req: Request<IGetUserRequest>,
  res: Response
) => {
  const { result, err } = await getUser({ id: req.params.id });
  if (err) ExpressResErr(res, err);
  else ExpressRes(res, 200, result);
};

export const createUserApi = async (
  req: Request<ICreateUserRequest>,
  res: Response
) => {
  const { result, err } = await createUser(req.body);
  if (err) ExpressResErr(res, err);
  else ExpressRes(res, 201, result);
};

export const updateUserApi = async (
  req: Request<IUpdateUserRequest>,
  res: Response
) => {
  const { err } = await updateUser({ id: req.params.id, ...req.body });
  if (err) ExpressResErr(res, err);
  else ExpressRes(res, 200);
};

export const deleteUserApi = async (
  req: Request<IDeleteUserRequest>,
  res: Response
) => {
  const { err } = await deleteUser({ id: req.params.id });
  if (err) ExpressResErr(res, err);
  else ExpressRes(res, 200);
};
