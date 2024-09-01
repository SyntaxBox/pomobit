import { HTMLAttributes } from "react";
import { ColorUtils } from "../../lib/utils";
import { Button } from "../../ui/button";
import { useUI } from "../../hooks";
import { RotateCcw } from "lucide-react";
import { usePomodoroStore } from "../../store";

export function ResetButton({
  pallet,
  onClick,
  ...rest
}: Omit<HTMLAttributes<HTMLButtonElement>, "children"> & {
  pallet?: ColorUtils.ColorPallet;
}) {
  const { workPallet, breakPallet } = useUI();
  const { isBreak } = usePomodoroStore();
  return (
    <Button
      className="w-16 h-16 p-0"
      pallet={pallet ?? (isBreak ? breakPallet : workPallet)}
      {...rest}
      onClick={onClick}
    >
      <RotateCcw className="rotate-90 h-7 w-7" strokeWidth={3} />
    </Button>
  );
}
