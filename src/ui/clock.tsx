export function Clock({ min, sec }: { min: number; sec: number }) {
  if (sec > 60 || min > 60 || sec < 0 || min < 0) {
    throw new Error(`Invalid Props, sec: ${sec}, min: ${min}`);
  }

  return (
    <div>
      <span>{min}</span>
      <span>{sec}</span>
    </div>
  );
}
