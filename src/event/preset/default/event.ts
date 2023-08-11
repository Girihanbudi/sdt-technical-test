import { EventLog } from "@prisma/client";

export const defaultEventLog: EventLog = {
  id: 0,
  StartedAt: new Date(),
  EndedAt: null,
  objective: "",
  participants: [],
  status: "",
  error: null,
  log: null,
};
