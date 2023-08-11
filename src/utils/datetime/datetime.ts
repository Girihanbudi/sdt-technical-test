export const getTimezoneOffset = (date: Date, compareHour: number) => {
  let floatingPoint: number = 0;
  const minute = date.getUTCMinutes();
  if (minute >= 15 && minute < 30) floatingPoint = 0.25;
  else if (minute >= 30 && minute < 45) floatingPoint = 0.5;
  else if (minute >= 45 && minute < 60) floatingPoint = 0.75;

  return date.getUTCHours() - compareHour + floatingPoint;
};
