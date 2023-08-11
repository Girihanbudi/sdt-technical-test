import prisma from "../../libs/prisma";
import { Prisma } from "@prisma/client";
import { nanoid } from "nanoid";
import {
  ErrBadRequest,
  ErrDuplicateRecord,
  ErrInternalServerError,
} from "../../pkg/stderror";
import { StdResponse } from "../../pkg/stdresponse";
import ajv, { convertToStdErr } from "../../libs/ajv";
import {
  createUserScheme,
  ICreateUserRequest,
  ICreateUserResponse,
} from "../preset";
import { trim } from "../../utils/strings";

export const createUser = async (
  payload: ICreateUserRequest
): Promise<StdResponse<ICreateUserResponse>> => {
  // Create an empty result
  var result: StdResponse<ICreateUserResponse> = {};

  // Validate payload
  const validate = ajv.compile(createUserScheme);
  const isValid = validate(payload);
  if (!isValid) {
    result.err = convertToStdErr(validate);
    return result;
  }

  // Check if user already exist
  const userExist = !!(await prisma.user.findFirst({
    where: {
      email: {
        equals: payload.email,
      },
    },
  }));
  if (userExist) {
    result.err = ErrDuplicateRecord();
    return result;
  }

  // Create a new user
  let fullName = trim(payload.fullName);
  let firstName = fullName.split(" ", 1)[0];
  let lastName =
    fullName.length <= firstName.length + 1
      ? null
      : fullName.substring(firstName.length + 1);

  try {
    const user = await prisma.user.create({
      data: {
        id: nanoid(),
        email: payload.email,
        firstName: firstName,
        lastName: lastName,
        fullName: fullName,
        dob: new Date(payload.dob),
        timezone: payload.timezone,
      },
    });
    // Return generated user id
    result.result = { id: user.id };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.meta) {
      result.err = ErrBadRequest().setErrorFromString(e.meta.cause as string);
    } else {
      result.err = ErrInternalServerError();
    }
  }
  return result;
};

export default createUser;
