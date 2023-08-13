import Timezone from "./timezone.interface";
import { default as tzJson } from "./timezones.json";

const initIdentifiers = (timezones: Timezone[]): Set<string> => {
  let temp: string[] = [];
  timezones.forEach((tz) => temp.push(...tz.utc));
  temp = temp.sort();
  return new Set(temp);
};

export const timezones: Timezone[] = tzJson as Timezone[];

export const minOffset = -12;

export const maxOffset = 13;

export const getTimezoneOffset = (date: Date, compareHour: number) => {
  let floatingPoint: number = 0;
  const minute = date.getUTCMinutes();
  if (minute >= 15 && minute < 30) floatingPoint = 0.25;
  else if (minute >= 30 && minute < 45) floatingPoint = 0.5;
  else if (minute >= 45 && minute < 60) floatingPoint = 0.75;

  const difference = compareHour - date.getUTCHours();

  return difference + floatingPoint;
};

export interface OffsetRange {
  min: number;
  max: number;
}

export const getOffsetRanges = (
  initial: number,
  addition: number
): OffsetRange[] => {
  if (addition > 12) addition = 12;
  else if (addition < -12) addition = -12;

  let ranges: OffsetRange[] = [];
  const target = initial + addition;
  if (target > maxOffset) {
    ranges.push({
      min: initial,
      max: maxOffset,
    });
    ranges.push({
      min: minOffset,
      max: minOffset + (target - maxOffset),
    });
  } else if (target < minOffset) {
    ranges.push({
      min: minOffset,
      max: initial,
    });
    ranges.push({
      min: maxOffset + (target - minOffset),
      max: maxOffset,
    });
  } else {
    ranges.push({
      min: Math.min(initial, target),
      max: Math.max(initial, target),
    });
  }

  return ranges;
};

export const tzIdentifiers = initIdentifiers(timezones);

export const tzIdentifiersByOffset = (offset: number) => {
  let temp: string[] = [];
  timezones
    .filter((tz) => tz.offset === offset)
    .forEach((tz) => temp.push(...tz.utc));
  return temp;
};

export const tzIdentifiersByOffsetRanges = (ranges: OffsetRange[]) => {
  let temp = new Set<string>();
  timezones
    .filter((tz) => {
      for (let i = 0; i < ranges.length; i++) {
        if (tz.offset >= ranges[i].min && tz.offset <= ranges[i].max) return tz;
      }
    })
    .forEach((tz) => {
      tz.utc.forEach((zone) => temp.add(zone));
    });
  return [...temp];
};
