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
