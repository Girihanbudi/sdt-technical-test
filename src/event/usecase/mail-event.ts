import { defaultEventLog } from "./../preset/default/event";
import prisma from "../../libs/prisma";
import { EventLog, User } from "@prisma/client";
import ajv from "../../libs/ajv";
import { SendMail } from "../../mailer/usecase";
import {
  EventObjective,
  IHappyBirthdayEvent,
  MailMaxAttempt,
  MailStatus,
  happyBirthdayEventScheme,
} from "../preset";
import {
  getTimezoneOffset,
  tzIdentifiersByOffsetRanges,
  getOffsetRanges,
} from "../../utils/timezone/timezones";
import { initEventLog, updateEventLog, finishEventLog } from "./event";

export const HappyBirthdayMailEvent = async (
  payload: IHappyBirthdayEvent,
  validate: boolean = false
) => {
  const current = new Date();
  console.log(
    "[HappyBirthdayMailEvent] start sending happy birthday event",
    current
  );

  // Validate payload
  if (validate) {
    const validator = ajv.compile(happyBirthdayEventScheme);
    const isValid = validator(payload);
    if (!isValid) {
      console.log("[HappyBirthdayMailEvent] request is not valid", current);
      return;
    }
  }

  const currentOffset = getTimezoneOffset(current, payload.hour);
  const offsetRanges = getOffsetRanges(currentOffset, 12); // 12 hours back tollerance
  const zones = tzIdentifiersByOffsetRanges(offsetRanges);

  let users: User[] = [];

  // Query all user from current time to 12 hours back that not processed yet
  const firstAttemptQuery = `SELECT u.* FROM users u
  LEFT OUTER JOIN mail_logs l ON u.email = l.email
  AND l."createdAt" = CURRENT_DATE
  AND l.topic = '${EventObjective.Birthday}'
  WHERE l.email IS NULL
    AND date_part('day', dob) = ${current.getUTCDate()}
    AND date_part('month', dob) = ${current.getUTCMonth() + 1}
    AND timezone in (${zones.map((zone) => `'${zone}'`).join(",")});`;

  // Query all user that has been processed but failed with max attempt limit
  const reAttemptQuery = `SELECT u.* FROM users u
  INNER JOIN (SELECT
    email,
    count(*) as attempt,
    count(status = '${MailStatus.Success}') as success,
    count(status = '${MailStatus.Failed}') as failed
  FROM mail_logs
  Where "createdAt" = CURRENT_DATE
    AND topic = '${EventObjective.Birthday}'
  GROUP BY email) temp on u.email = temp.email
  WHERE temp.attempt < ${MailMaxAttempt}
    AND temp.failed > 0 
    AND temp.success = 0;`;

  try {
    if (zones.length > 0) {
      const users1: User[] = await prisma.$queryRawUnsafe(firstAttemptQuery);
      users = users.concat(users1);
    }

    const users2: User[] = await prisma.$queryRawUnsafe(reAttemptQuery);
    users = users.concat(users2);
  } catch (e) {
    console.log("[HappyBirthdayMailEvent] failed to get users:", e);
  }

  if (users.length == 0) {
    console.log("[HappyBirthdayMailEvent] no user found");
    return;
  }

  let log: EventLog = { ...defaultEventLog };
  const { result, err } = await initEventLog(
    EventObjective.Birthday,
    users.map((user) => user.id)
  );
  if (err) {
    console.log("[HappyBirthdayMailEvent] unable to init log:", err.title);
    return;
  } else if (result) {
    log = result;
  }

  users.forEach(async (user) => {
    const { result, err } = await SendMail({
      topic: EventObjective.Birthday,
      email: user.email,
      message: `Hey, ${user.fullName} it’s your birthday`,
    });
    const message = err ? err.title : result ? result.status : undefined;
    updateEventLog(log, { ref: user.id, time: new Date(), msg: message });
  });

  finishEventLog(log);

  console.log("[HappyBirthdayMailEvent] finish sending happy birthday event");
};
