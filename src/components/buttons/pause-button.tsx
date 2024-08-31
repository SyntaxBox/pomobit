import { HTMLAttributes, useEffect, useState, useCallback } from "react";
import { ColorUtils } from "../../lib/utils";
import { Button } from "../../ui/button";
import { useUI } from "../../hooks";
import { Triangle, Pause } from "lucide-react";
import { usePomodoroStore } from "../../store";

export function PauseButton({
  onPause,
  onResume,
  pallet,
  controlled = false,
  isPaused: externalIsPaused,
  setPaused: externalSetPaused,
  reset = false, // Add reset prop
  ...rest
}: Omit<HTMLAttributes<HTMLButtonElement>, "children" | "onClick"> & {
  onPause?: () => void;
  onResume?: () => void;
  pallet?: ColorUtils.ColorPallet;
  controlled?: boolean;
  isPaused?: boolean;
  setPaused?: (paused: boolean) => void;
  reset?: boolean; // New reset prop
}) {
  const { workPallet, breakPallet } = useUI();
  const { isBreak } = usePomodoroStore();
  const [internalIsPaused, setInternalIsPaused] = useState(false);

  const isPaused = controlled ? externalIsPaused : internalIsPaused;

  useEffect(() => {
    if (reset) {
      setInternalIsPaused(false); // Reset to initial state (Triangle icon)
      externalSetPaused?.(false);
    }
  }, [reset, externalSetPaused]);

  useEffect(() => {
    if (isPaused !== undefined) {
      isPaused ? onResume?.() : onPause?.();
    }
  }, [isPaused, onPause, onResume]);

  const handleClick = useCallback(() => {
    if (controlled) {
      externalSetPaused?.(!isPaused);
    } else {
      setInternalIsPaused((prev) => !prev);
    }
  }, [controlled, externalSetPaused, isPaused]);

  return (
    <Button
      className="w-10 h-10 p-0"
      pallet={pallet ?? (isBreak ? breakPallet : workPallet)}
      {...rest}
      onClick={handleClick}
    >
      {isPaused ? (
        <Pause fill="current" className="w-5" />
      ) : (
        <Triangle className="w-4 rotate-90" fill="current" />
      )}
    </Button>
  );
}
