export function getMinutesAndSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return { minutes, seconds } as const;
}

export function getSeconds({
  time,
  minutes,
  seconds,
}: {
  time: number;
  minutes?: number;
  seconds?: number;
}) {
  if (minutes === undefined && seconds === undefined) return time;
  if (minutes === undefined) return time + (seconds || 0);
  if (seconds === undefined)
    return minutes * 60 + getMinutesAndSeconds(time).seconds;
  return minutes * 60 + seconds;
}

export function simpleFormatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getUTCDate(); // Get the day of the month
  const month = date.toLocaleString("default", { month: "short" }); // Get the abbreviated month name
  // Determine the ordinal suffix
  let suffix = "th";
  if (day % 10 === 1 && day !== 11) {
    suffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    suffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    suffix = "rd";
  }
  return `${month}, ${day}${suffix}`; // Format the date as "12, Mar"
}
