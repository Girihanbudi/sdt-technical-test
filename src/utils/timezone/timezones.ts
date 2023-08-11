import Timezone from "./timezone.interface";
import { default as tzJson } from "./timezones.json";

const initIdentifiers = (timezones: Timezone[]): Set<string> => {
  let temp: string[] = [];
  timezones.forEach((tz) => temp.push(...tz.utc));
  temp = temp.sort();
  return new Set(temp);
};

export const timezones: Timezone[] = tzJson as Timezone[];
export const tzIdentifiers = initIdentifiers(timezones);
export const tzIdentifiersByOffset = (offset: number) => {
  let temp: string[] = [];
  timezones
    .filter((tz) => tz.offset === offset)
    .forEach((tz) => temp.push(...tz.utc));
  return temp;
};
