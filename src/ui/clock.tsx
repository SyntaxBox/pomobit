import { ColorUtils } from "../lib/utils";

export function Clock({
  minutes,
  seconds,
  pallet,
}: {
  minutes: number;
  seconds: number;
  pallet: ColorUtils.ColorPallet;
}) {
  if (seconds > 60 || minutes > 60 || seconds < 0 || minutes < 0) {
    throw new Error(`Invalid Props, seconds: ${seconds}, minutes: ${minutes}`);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <span
        className="text-[256px] font-bold"
        style={{
          color: pallet.text1,
          lineHeight: 0.8,
        }}
      >
        {minutes < 10 ? "0" : ""}
        {minutes}
      </span>
      <span
        className="text-[256px] opacity-80 font-bold"
        style={{
          color: pallet.text2,
          lineHeight: 0.8,
        }}
      >
        {seconds < 10 ? "0" : ""}
        {seconds}
      </span>
    </div>
  );
}
