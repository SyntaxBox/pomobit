import { HTMLAttributes, useEffect, useState, useCallback } from "react";
import { ColorUtils } from "../../lib/utils";
import { Button } from "../../ui/button";
import { useUI } from "../../hooks";
import { Triangle, Pause } from "lucide-react";

export function PauseButton({
  onPause,
  onResume,
  pallet,
  ...rest
}: Omit<HTMLAttributes<HTMLButtonElement>, "children" | "onClick"> & {
  onPause?: () => void;
  onResume?: () => void;
  pallet?: ColorUtils.ColorPallet;
}) {
  const { workPallet } = useUI();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    isPaused ? onPause && onPause() : onResume && onResume();
  }, [isPaused, onPause, onResume]);

  const handleClick = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  return (
    <Button
      className="w-10 h-10 p-0"
      pallet={pallet ?? workPallet}
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
