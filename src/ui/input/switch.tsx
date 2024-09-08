import { cn, ColorUtils } from "../../lib/utils";

export function Switch({
  pallet,
  value,
  onChange,
}: {
  pallet: ColorUtils.ColorPallet;
  value: boolean;
  onChange?: (newValue: boolean) => void;
}) {
  return (
    <label
      onClick={() => onChange && onChange(!value)}
      className="inline-flex items-center cursor-pointer"
    >
      <div
        className="relative w-[52px] h-7 rounded-md transition-colors"
        style={{
          backgroundColor: `${pallet.primary1}${value ? "90" : "20"}`,
        }}
      >
        <span
          className={cn(
            "absolute bg-white top-[2px] left-[2px] w-6 h-6 rounded transition-transform",
            value ? "translate-x-full" : "",
          )}
        />
      </div>
    </label>
  );
}
