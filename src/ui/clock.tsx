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
    <div className="flex flex-col items-center justify-center w-full overflow-hidden">
      <span
        className="text-[256px] font-bold leading-[0.8] w-full text-center"
        style={{
          color: pallet.text1,
          fontSize: "min(70vw, 256px)",
        }}
      >
        {minutes.toString().padStart(2, "0")}
      </span>
      <span
        className="text-[256px] font-bold leading-[0.8] opacity-80 w-full text-center"
        style={{
          color: pallet.text2,
          fontSize: "min(70vw, 256px)",
        }}
      >
        {seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
