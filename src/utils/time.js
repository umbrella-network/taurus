import { differenceInDays, intervalToDuration } from "date-fns";

function formatTimeString(amount, timeUnit) {
  if (amount === 0) {
    return "";
  }
  return `${amount} ${timeUnit}${amount > 1 ? "s" : ""}`;
}

function ageFromTimeStrings(timeStrings) {
  return [...timeStrings, "ago"].join(" ");
}

export function readableAgeFromTimestamp(timestamp) {
  const blockDate = new Date(timestamp);
  const currentDate = new Date();

  const days = differenceInDays(currentDate, blockDate);

  const { hours, minutes, seconds } = intervalToDuration({
    start: blockDate,
    end: currentDate,
  });

  const dayString = formatTimeString(days, "day");
  const hourString = formatTimeString(hours, "hr");
  const minuteString = formatTimeString(minutes, "min");
  const secondString = formatTimeString(seconds, "sec");

  if (!days && !hours && !minutes) {
    return ageFromTimeStrings([secondString]);
  } else {
    if (!days) {
      return ageFromTimeStrings([hourString, minuteString]);
    } else {
      return ageFromTimeStrings([dayString, hours ? hourString : minuteString]);
    }
  }
}

export function formatTimestamp(timestamp) {
  return new Date(timestamp)
    .toISOString()
    .replace("T", " ")
    .replace(".000", " ");
}
