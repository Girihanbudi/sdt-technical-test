import {
  getOffsetRanges,
  getTimezoneOffset,
  tzIdentifiersByOffsetRanges,
} from "./timezones";

test("Get proper offset ranges with positive addition", () => {
  expect(getOffsetRanges(3.75, 2)).toStrictEqual([{ min: 3.75, max: 5.75 }]);
});

test("Get proper offset ranges with negative addition", () => {
  expect(getOffsetRanges(3.75, -2)).toStrictEqual([{ min: 1.75, max: 3.75 }]);
});

test("Get proper offset ranges with positive addition multi ranges output", () => {
  expect(getOffsetRanges(3.75, 12)).toStrictEqual([
    { min: 3.75, max: 13 },
    { min: -12, max: -9.25 },
  ]);
});

test("Get proper offset ranges with negative addition multi ranges output", () => {
  expect(getOffsetRanges(-5, -12)).toStrictEqual([
    { min: -12, max: -5 },
    { min: 8, max: 13 },
  ]);
});

test("Get timezone offset value", () => {
  expect(getTimezoneOffset(new Date(2023, 8, 11, 10), 9)).toStrictEqual(6);
});

test("Get timezone offset value with float point", () => {
  expect(getTimezoneOffset(new Date(2023, 8, 11, 10, 15), 9)).toStrictEqual(
    6.25
  );
  expect(getTimezoneOffset(new Date(2023, 8, 11, 10, 30), 9)).toStrictEqual(
    6.5
  );
  expect(getTimezoneOffset(new Date(2023, 8, 11, 10, 45), 9)).toStrictEqual(
    6.75
  );
  expect(getTimezoneOffset(new Date(2023, 8, 11, 10, 0), 9)).toStrictEqual(6);
});

test("Get timezone by offset ranges", () => {
  expect(tzIdentifiersByOffsetRanges([{ min: -12, max: -11 }])).toStrictEqual([
    "Etc/GMT+12",
    "Etc/GMT+11",
    "Pacific/Midway",
    "Pacific/Niue",
    "Pacific/Pago_Pago",
  ]);

  expect(
    tzIdentifiersByOffsetRanges([
      { min: 12, max: 13 },
      { min: -12, max: -11 },
    ])
  ).toStrictEqual([
    "Etc/GMT+12",
    "Etc/GMT+11",
    "Pacific/Midway",
    "Pacific/Niue",
    "Pacific/Pago_Pago",
    "Antarctica/McMurdo",
    "Pacific/Auckland",
    "Etc/GMT-12",
    "Pacific/Funafuti",
    "Pacific/Kwajalein",
    "Pacific/Majuro",
    "Pacific/Nauru",
    "Pacific/Tarawa",
    "Pacific/Wake",
    "Pacific/Wallis",
    "Pacific/Fiji",
    "Asia/Anadyr",
    "Asia/Kamchatka",
    "Asia/Magadan",
    "Asia/Srednekolymsk",
    "Etc/GMT-13",
    "Pacific/Enderbury",
    "Pacific/Fakaofo",
    "Pacific/Tongatapu",
    "Pacific/Apia",
  ]);
});
