import React, { useEffect, useRef, useState } from "react";
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
  const [isIncrementing, setIsIncrementing] = useState(false);
  const [isDecrementing, setIsDecrementing] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const speedRef = useRef(300);

  // Function to pad the value with leading zeros
  const paddedValue = value.toString().padStart(zeroPadding, "0");

  const startIncrementing = () => {
    setIsIncrementing(true);
  };

  const startDecrementing = () => {
    setIsDecrementing(true);
  };

  const stopChanging = () => {
    setIsIncrementing(false);
    setIsDecrementing(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    speedRef.current = 300; // Reset speed
  };

  useEffect(() => {
    if (isIncrementing || isDecrementing) {
      const changeValue = () => {
        onChange?.(isIncrementing ? value + 1 : value - 1);
        speedRef.current = Math.max(50, speedRef.current * 0.8); // Increase speed, but not faster than 50ms

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        intervalRef.current = window.setInterval(changeValue, speedRef.current);
      };

      intervalRef.current = window.setInterval(changeValue, speedRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isIncrementing, isDecrementing, onChange, value]);

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
          onMouseDown={startIncrementing}
          onMouseUp={stopChanging}
          onMouseLeave={stopChanging}
          onTouchStart={startIncrementing}
          onTouchEnd={stopChanging}
          className="border-b border-l h-full w-fit p-1"
          style={{
            borderColor: currentPallet.text1 + "90",
          }}
        >
          <Play className="w-3 h-3 -rotate-90" fill="current" />
        </button>
        <button
          onMouseDown={startDecrementing}
          onMouseUp={stopChanging}
          onMouseLeave={stopChanging}
          onTouchStart={startDecrementing}
          onTouchEnd={stopChanging}
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
