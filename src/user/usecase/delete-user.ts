import prisma from "../../libs/prisma";
import { Prisma } from "@prisma/client";
import { StdResponse } from "../../pkg/stdresponse";
import ajv, { convertToStdErr } from "../../libs/ajv";
import { ErrInternalServerError, ErrNotFound } from "../../pkg/stderror";
import { deleteUserScheme, IDeleteUserRequest } from "../preset";

export const deleteUser = async (
  payload: IDeleteUserRequest
): Promise<StdResponse> => {
  // Create an empty result
  var result: StdResponse = {};

  // Validate payload
  const validate = ajv.compile(deleteUserScheme);
  const isValid = validate(payload);
  if (!isValid) {
    result.err = convertToStdErr(validate);
    return result;
  }

  // Delete user
  try {
    await prisma.user.delete({
      where: {
        id: payload.id,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.meta) {
      result.err = ErrNotFound().setErrorFromString(e.meta.cause as string);
    } else {
      result.err = ErrInternalServerError();
    }
  }

  return result;
};

export default deleteUser;
