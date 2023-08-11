import { EventLog } from "@prisma/client";
import prisma from "../../libs/prisma";
import { ErrInternalServerError } from "../../pkg/stderror";
import { StdResponse } from "../../pkg/stdresponse";
import { EventLogStatus } from "../preset";
import { EventLogData } from "../preset";

export const initEventLog = async (
  objective: string,
  participants: string[]
): Promise<StdResponse<EventLog>> => {
  // Create an empty result
  var result: StdResponse<EventLog> = {};

  try {
    const eventLog = await prisma.eventLog.create({
      data: {
        objective: objective,
        participants: participants,
        status: EventLogStatus.Running,
      },
    });
    // Return generated user id
    result.result = eventLog;
  } catch (e) {
    result.err = ErrInternalServerError();
  }

  return result;
};

export const addEventLogging = (
  eventLog: EventLog,
  ...eventLogData: EventLogData[]
): EventLog => {
  let logData: EventLogData[] = [];
  if (eventLog.log && eventLog.log.length > 0) {
    logData = JSON.parse(eventLog.log);
  }

  eventLogData.forEach((data) => logData.push(data));

  eventLog.log = JSON.stringify(logData);
  return eventLog;
};

export const updateEventLog = async (
  eventLog: EventLog,
  ...eventLogData: EventLogData[]
): Promise<StdResponse<EventLog>> => {
  // Create an empty result
  var result: StdResponse<EventLog> = {};

  eventLog = addEventLogging(eventLog, ...eventLogData);
  eventLog.EndedAt = new Date();
  result.result = eventLog;

  try {
    await prisma.eventLog.update({
      where: {
        id: eventLog.id,
      },
      data: { ...eventLog },
    });
  } catch (e) {
    result.err = ErrInternalServerError();
  }

  return result;
};

export const finishEventLog = async (
  eventLog: EventLog
): Promise<StdResponse<EventLog>> => {
  // Create an empty result
  var result: StdResponse<EventLog> = {};

  eventLog.status = EventLogStatus.Success;
  eventLog.EndedAt = new Date();
  result.result = eventLog;

  try {
    await prisma.eventLog.update({
      where: {
        id: eventLog.id,
      },
      data: { ...eventLog },
    });
  } catch (e) {
    result.err = ErrInternalServerError();
  }

  return result;
};
