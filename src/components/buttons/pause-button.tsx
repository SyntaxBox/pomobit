import { HTMLAttributes, useEffect, useState, useCallback } from "react";
import { ColorUtils } from "../../lib/utils";
import { Button } from "../../ui/button";
import { useUI } from "../../hooks";
import { Triangle, Pause } from "lucide-react";

interface PauseButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children" | "onClick"> {
  onPause: () => void;
  onResume: () => void;
  pallet?: ColorUtils.ColorPallet;
}

export function PauseButton({
  onPause,
  onResume,
  pallet,
  ...rest
}: PauseButtonProps) {
  const { workPallet } = useUI();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    isPaused ? onPause() : onResume();
  }, [isPaused, onPause, onResume]);

  const handleClick = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  return (
    <Button pallet={pallet ?? workPallet} {...rest} onClick={handleClick}>
      {isPaused ? <Pause /> : <Triangle />}
    </Button>
  );
}
