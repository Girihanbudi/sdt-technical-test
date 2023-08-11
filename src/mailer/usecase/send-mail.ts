import {
  sendMailScheme,
  ISendMailRequest,
  ISendMailResponse,
  MailStatus,
} from "../preset";
import { StdResponse } from "../../pkg/stdresponse";
import { sendEmail } from "../../libs/mailer";
import ajv, { convertToStdErr } from "../../libs/ajv";
import prisma from "../../libs/prisma";
import { Prisma, MailLog } from "@prisma/client";
import { ErrBadRequest, ErrInternalServerError } from "../../pkg/stderror";

export const SendMail = async (
  payload: ISendMailRequest
): Promise<StdResponse<ISendMailResponse>> => {
  // Create an empty result
  var result: StdResponse<ISendMailResponse> = {};

  // Validate payload
  const validate = ajv.compile(sendMailScheme);
  const isValid = validate(payload);
  if (!isValid) {
    result.err = convertToStdErr(validate);
    return result;
  }

  let log: MailLog | null = null;
  try {
    log = await prisma.mailLog.create({
      data: {
        topic: payload.topic,
        email: payload.email,
        message: payload.message,
        status: MailStatus.Created,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.meta) {
      result.err = ErrBadRequest().setErrorFromString(e.meta.cause as string);
    } else {
      result.err = ErrInternalServerError();
    }
    return result;
  }

  const res = await sendEmail({
    email: payload.email,
    message: payload.message,
  });

  log.response = JSON.stringify(res.result);
  log.error = JSON.stringify(res.err);
  log.status = res.err ? MailStatus.Failed : MailStatus.Success;

  try {
    await prisma.mailLog.update({
      where: {
        id: log.id,
      },
      data: { ...log },
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

  result.result = { ...log };
  return result;
};
