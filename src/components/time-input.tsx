import { TimeUtils } from "../lib/utils";
import { NumberInput } from "../ui";

export function TimeInput({
  time,
  onChange,
}: {
  time: number;
  onChange: (time: number) => void;
}) {
  const { minutes, seconds } = TimeUtils.getMinutesAndSeconds(time);

  const handleMinutesChange = ({
    minutes,
    seconds,
  }: {
    minutes?: number;
    seconds?: number;
  }) => {
    // Calculate time based solely on minutes and seconds without reusing `time`
    const updatedMinutes =
      minutes !== undefined
        ? minutes
        : TimeUtils.getMinutesAndSeconds(time).minutes;
    const updatedSeconds =
      seconds !== undefined
        ? seconds
        : TimeUtils.getMinutesAndSeconds(time).seconds;

    // Convert to total seconds
    const totalSeconds = updatedMinutes * 60 + updatedSeconds;

    // Call onChange with the new total seconds
    if (totalSeconds > 0) onChange(totalSeconds);
  };

  return (
    <div className="flex">
      <NumberInput
        text="M"
        value={minutes}
        className="rounded-r-none"
        onChange={(minutes) => handleMinutesChange({ minutes })}
      />
      <NumberInput
        text="S"
        value={seconds}
        className="rounded-l-none"
        onChange={(seconds) => handleMinutesChange({ seconds })}
      />
    </div>
  );
}
