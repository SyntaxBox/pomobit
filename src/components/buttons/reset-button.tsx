import { HTMLAttributes } from "react";
import { ColorUtils } from "../../lib/utils";
import { Button } from "../../ui";
import { useUI } from "../../hooks";
import { RotateCcw } from "lucide-react";

export function ResetButton({
  pallet,
  onClick,
  ...rest
}: Omit<HTMLAttributes<HTMLButtonElement>, "children"> & {
  pallet?: ColorUtils.ColorPallet;
}) {
  const { currentPallet } = useUI();
  return (
    <Button
      className="w-16 h-16 p-0 rounded-2xl"
      pallet={pallet ?? currentPallet}
      {...rest}
      onClick={onClick}
    >
      <RotateCcw className="rotate-90 h-7 w-7" strokeWidth={3} />
    </Button>
  );
}
