import { HTMLAttributes } from "react";
import { ColorUtils } from "../../lib/utils";
import { Button } from "../../ui/button";
import { useUI } from "../../hooks";
import { RotateCcw } from "lucide-react";

export function ResetButton({
  pallet,
  onClick,
  ...rest
}: Omit<HTMLAttributes<HTMLButtonElement>, "children"> & {
  pallet?: ColorUtils.ColorPallet;
}) {
  const { workPallet } = useUI();

  return (
    <Button
      className="w-10 h-10 p-0"
      pallet={pallet ?? workPallet}
      {...rest}
      onClick={onClick}
    >
      <RotateCcw className="w-4 rotate-90" strokeWidth={4} />
    </Button>
  );
}
