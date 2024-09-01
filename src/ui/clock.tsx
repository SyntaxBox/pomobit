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
    <div className="flex flex-col items-center">
      <span
        className="text-[256px] font-bold -mb-20"
        style={{
          color: pallet.text1,
        }}
      >
        {minutes < 10 ? 0 : ""}
        {minutes}
      </span>
      <span
        className="text-[256px] opacity-80 font-bold -mt-20"
        style={{
          color: pallet.text2,
        }}
      >
        {seconds < 10 ? 0 : ""}
        {seconds}
      </span>
    </div>
  );
}
