import { HappyBirthdayMailEvent } from "./event/usecase";

export interface CronValue {
  format: string;
  task: () => void;
}

export const HappyBirthDayEventCron = (): CronValue => {
  return {
    format: "0 */15 * * * *", // run every 15 minutes
    task: () => HappyBirthdayMailEvent({ hour: 9 }),
  };
};

export const CronList: CronValue[] = [HappyBirthDayEventCron()];

export default CronList;
