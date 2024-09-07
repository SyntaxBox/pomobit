import { Play } from "lucide-react";
import { useUI } from "../../hooks";
import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function NumberInput({
  value = 0,
  onChange,
  text,
  style,
  className,
  zeroPadding = 2,
  ...rest
}: {
  value?: number;
  zeroPadding?: number;
  text?: string;
  onChange?: (n: number) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange">) {
  const { currentPallet } = useUI();

  // Function to pad the value with leading zeros
  const paddedValue = value.toString().padStart(zeroPadding, "0");

  return (
    <div
      {...rest}
      className={cn(
        "border rounded-md w-fit pl-3 flex gap-3 items-center overflow-hidden",
        className,
      )}
      style={{
        borderColor: currentPallet.text1 + "90",
        color: currentPallet.text1,
        ...style,
      }}
    >
      <div className="flex gap-[2px] items-center">
        <input
          disabled
          value={paddedValue}
          style={{
            width: paddedValue.length + "ch",
          }}
          className="text-lg bg-transparent"
        />
        {text && <span className="opacity-80">{text}</span>}
      </div>
      <div
        className="flex flex-col"
        style={{
          color: currentPallet.text1,
        }}
      >
        <button
          onClick={() => onChange && onChange(value + 1)}
          className="border-b border-l h-full w-fit p-1"
          style={{
            borderColor: currentPallet.text1 + "90",
          }}
        >
          <Play className="w-3 h-3 -rotate-90" fill="current" />
        </button>
        <button
          onClick={() => onChange && onChange(value - 1)}
          className="h-full w-fit p-1 border-l"
          style={{
            borderColor: currentPallet.text1 + "90",
          }}
        >
          <Play className="w-3 h-3 rotate-90" fill="current" />
        </button>
      </div>
    </div>
  );
}
