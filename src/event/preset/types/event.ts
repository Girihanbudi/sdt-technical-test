export enum EventObjective {
  Birthday = "birthday",
}

export const EventObjectives = Object.values(EventObjective);

export enum EventLogStatus {
  Running = "running",
  Failed = "failed",
  Success = "success",
}

export const EventLogStatuses = Object.values(EventLogStatus);

export enum MailStatus {
  Created = "created",
  Failed = "failed",
  Success = "success",
}

export const MailStatuses = Object.values(MailStatus);

export interface EventLogData {
  time: Date;
  msg?: string;
}

export const MailMaxAttempt = process.env.MAIL_EVENT_MAX_ATTEMPT;
