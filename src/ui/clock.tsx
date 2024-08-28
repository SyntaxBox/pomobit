import { ColorUtils } from "../lib/utils";

export function Clock({
  min,
  sec,
  pallet,
}: {
  min: number;
  sec: number;
  pallet: ColorUtils.ColorPallet;
}) {
  if (sec > 60 || min > 60 || sec < 0 || min < 0) {
    throw new Error(`Invalid Props, sec: ${sec}, min: ${min}`);
  }

  return (
    <div className="flex flex-col items-center text-center">
      <span
        className="text-9xl font-bold"
        style={{
          color: pallet.text1,
        }}
      >
        {min < 10 ? 0 : ""}
        {min}
      </span>
      <span
        className="text-9xl opacity-80 font-semibold"
        style={{
          color: pallet.text2,
        }}
      >
        {sec < 10 ? 0 : ""}
        {sec}
      </span>
    </div>
  );
}
