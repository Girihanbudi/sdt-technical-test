import prisma from "../../libs/prisma";
import { Prisma, User } from "@prisma/client";
import { ErrInternalServerError, ErrNotFound } from "../../pkg/stderror";
import { StdResponse } from "../../pkg/stdresponse";
import ajv, { convertToStdErr } from "../../libs/ajv";
import { updateUserScheme, IUpdateUserRequest } from "../preset";

export const updateUser = async (
  payload: IUpdateUserRequest
): Promise<StdResponse> => {
  // Create an empty result
  var result: StdResponse = {};

  // Validate payload
  const validate = ajv.compile(updateUserScheme);
  const isValid = validate(payload);
  if (!isValid) {
    result.err = convertToStdErr(validate);
    return result;
  }

  // Get user record
  var user: User | null = null;
  try {
    user = await prisma.user.findFirst({
      where: {
        id: {
          equals: payload.id,
        },
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.meta) {
      result.err = ErrNotFound().setErrorFromString(e.meta.cause as string);
    } else {
      result.err = ErrInternalServerError();
    }
    return result;
  }

  // Update user data
  if (user) {
    let fullName = payload.fullName.trim();
    let firstName = fullName.split(" ", 1)[0];
    let lastName =
      fullName.length <= firstName.length + 1
        ? null
        : fullName.substring(firstName.length + 1);

    user.updatedAt = new Date();
    user.email = payload.email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.fullName = fullName;
    user.dob = new Date(payload.dob);
    user.timezone = payload.timezone;
  }

  try {
    await prisma.user.update({
      where: {
        id: payload.id,
      },
      data: { ...user },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.meta) {
      result.err = ErrInternalServerError().setErrorFromString(
        e.meta.cause as string
      );
    } else {
      result.err = ErrInternalServerError();
    }
  }

  return result;
};

export default updateUser;
