import prisma from "../../libs/prisma";
import { Prisma } from "@prisma/client";
import { StdResponse } from "../../pkg/stdresponse";
import ajv, { convertToStdErr } from "../../libs/ajv";
import { ErrInternalServerError, ErrNotFound } from "../../pkg/stderror";
import { getUserScheme, IGetUserRequest, IGetUserResponse } from "../preset";

export const getUser = async (
  payload: IGetUserRequest
): Promise<StdResponse<IGetUserResponse>> => {
  // Create an empty result
  var result: StdResponse<IGetUserResponse> = {};

  // Validate payload
  const validate = ajv.compile(getUserScheme);
  const isValid = validate(payload);
  if (!isValid) {
    result.err = convertToStdErr(validate);
    return result;
  }

  // Get user
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: payload.id,
      },
    });
    if (user) result.result = user;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.meta) {
      result.err = ErrNotFound().setErrorFromString(e.meta.cause as string);
    } else {
      result.err = ErrInternalServerError();
    }
  }

  return result;
};

export default getUser;
