const PI = Math.PI;

export type LunarDate = {
  day: number;
  month: number;
  year: number;
  isLeap: boolean;
};

function jdFromDate(day: number, month: number, year: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  let jd =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;

  if (jd < 2299161) {
    jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }

  return jd;
}

function jdToDate(jd: number): Date {
  let a: number;
  let b: number;
  let c: number;

  if (jd > 2299160) {
    a = jd + 32044;
    b = Math.floor((4 * a + 3) / 146097);
    c = a - Math.floor((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }

  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = b * 100 + d - 4800 + Math.floor(m / 10);

  return new Date(year, month - 1, day);
}

function newMoon(k: number): number {
  const time = k / 1236.85;
  const time2 = time * time;
  const time3 = time2 * time;
  const dr = PI / 180;
  let jd1 =
    2415020.75933 +
    29.53058868 * k +
    0.0001178 * time2 -
    0.000000155 * time3 +
    0.00033 * Math.sin((166.56 + 132.87 * time - 0.009173 * time2) * dr);
  const meanAnomalySun = 359.2242 + 29.10535608 * k - 0.0000333 * time2 - 0.00000347 * time3;
  const meanAnomalyMoon = 306.0253 + 385.81691806 * k + 0.0107306 * time2 + 0.00001236 * time3;
  const moonArgumentOfLatitude =
    21.2964 + 390.67050646 * k - 0.0016528 * time2 - 0.00000239 * time3;

  const correction =
    (0.1734 - 0.000393 * time) * Math.sin(meanAnomalySun * dr) +
    0.0021 * Math.sin(2 * dr * meanAnomalySun) -
    0.4068 * Math.sin(meanAnomalyMoon * dr) +
    0.0161 * Math.sin(2 * dr * meanAnomalyMoon) -
    0.0004 * Math.sin(3 * dr * meanAnomalyMoon) +
    0.0104 * Math.sin(2 * dr * moonArgumentOfLatitude) -
    0.0051 * Math.sin(dr * (meanAnomalySun + meanAnomalyMoon)) -
    0.0074 * Math.sin(dr * (meanAnomalySun - meanAnomalyMoon)) +
    0.0004 * Math.sin(dr * (2 * moonArgumentOfLatitude + meanAnomalySun)) -
    0.0004 * Math.sin(dr * (2 * moonArgumentOfLatitude - meanAnomalySun)) -
    0.0006 * Math.sin(dr * (2 * moonArgumentOfLatitude + meanAnomalyMoon)) +
    0.001 * Math.sin(dr * (2 * moonArgumentOfLatitude - meanAnomalyMoon)) +
    0.0005 * Math.sin(dr * (2 * meanAnomalyMoon + meanAnomalySun));

  const deltaTime =
    time < -11
      ? 0.001 + 0.000839 * time + 0.0002261 * time2 - 0.00000845 * time3 - 0.000000081 * time * time3
      : -0.000278 + 0.000265 * time + 0.000262 * time2;

  jd1 = jd1 + correction - deltaTime;
  return jd1;
}

function sunLongitude(jdn: number): number {
  const time = (jdn - 2451545.0) / 36525;
  const time2 = time * time;
  const dr = PI / 180;
  const meanAnomaly = 357.52910 + 35999.05030 * time - 0.0001559 * time2 - 0.00000048 * time * time2;
  const meanLongitude = 280.46645 + 36000.76983 * time + 0.0003032 * time2;
  const longitude =
    meanLongitude +
    (1.914600 - 0.004817 * time - 0.000014 * time2) * Math.sin(dr * meanAnomaly) +
    (0.019993 - 0.000101 * time) * Math.sin(dr * 2 * meanAnomaly) +
    0.000290 * Math.sin(dr * 3 * meanAnomaly);
  const omega = 125.04 - 1934.136 * time;
  let apparentLongitude = longitude - 0.00569 - 0.00478 * Math.sin(omega * dr);

  apparentLongitude = apparentLongitude * dr;
  apparentLongitude -= PI * 2 * Math.floor(apparentLongitude / (PI * 2));

  return apparentLongitude;
}

function getSunLongitude(dayNumber: number, timeZone: number): number {
  return Math.floor((sunLongitude(dayNumber - 0.5 - timeZone / 24) / PI) * 6);
}

function getNewMoonDay(k: number, timeZone: number): number {
  return Math.floor(newMoon(k) + 0.5 + timeZone / 24);
}

function getLunarMonth11(year: number, timeZone: number): number {
  const off = jdFromDate(31, 12, year) - 2415021;
  const k = Math.floor(off / 29.530588853);
  let month11 = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitude(month11, timeZone);

  if (sunLong >= 9) {
    month11 = getNewMoonDay(k - 1, timeZone);
  }

  return month11;
}

function getLeapMonthOffset(a11: number, timeZone: number): number {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let current = getSunLongitude(getNewMoonDay(k + 1, timeZone), timeZone);
  let i = 1;

  do {
    last = current;
    i += 1;
    current = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (current !== last && i < 14);

  return i - 1;
}

export function convertLunarToSolar(
  lunarDay: number,
  lunarMonth: number,
  lunarYear: number,
  lunarLeap: boolean,
  timeZone = 7
): Date {
  let a11: number;
  let b11: number;

  if (lunarMonth < 11) {
    a11 = getLunarMonth11(lunarYear - 1, timeZone);
    b11 = getLunarMonth11(lunarYear, timeZone);
  } else {
    a11 = getLunarMonth11(lunarYear, timeZone);
    b11 = getLunarMonth11(lunarYear + 1, timeZone);
  }

  const off = lunarMonth - 11 < 0 ? lunarMonth + 1 : lunarMonth - 11;

  let adjustedOff = off;

  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11, timeZone);
    const leapMonth = leapOff - 2 < 0 ? leapOff + 10 : leapOff - 2;

    if (lunarLeap && lunarMonth !== leapMonth) {
      throw new Error("Tháng nhuận âm lịch không hợp lệ.");
    }

    if (lunarLeap || off >= leapOff) {
      adjustedOff += 1;
    }
  }

  const k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  const monthStart = getNewMoonDay(k + adjustedOff, timeZone);

  return jdToDate(monthStart + lunarDay - 1);
}

export function getLunarDate(date: Date, timeZone = 7): LunarDate {
  const dayNumber = jdFromDate(date.getDate(), date.getMonth() + 1, date.getFullYear());
  const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);

  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }

  let a11 = getLunarMonth11(date.getFullYear(), timeZone);
  let b11 = a11;
  let lunarYear: number;

  if (a11 >= monthStart) {
    lunarYear = date.getFullYear();
    a11 = getLunarMonth11(date.getFullYear() - 1, timeZone);
  } else {
    lunarYear = date.getFullYear() + 1;
    b11 = getLunarMonth11(date.getFullYear() + 1, timeZone);
  }

  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  let lunarLeap = false;
  let lunarMonth = diff + 11;

  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);

    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;

      if (diff === leapMonthDiff) {
        lunarLeap = true;
      }
    }
  }

  if (lunarMonth > 12) {
    lunarMonth -= 12;
  }

  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }

  return {
    day: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    isLeap: lunarLeap
  };
}
