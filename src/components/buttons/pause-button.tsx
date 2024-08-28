import { HTMLAttributes } from "react";
import { ColorUtils } from "../../lib/utils";

export function PauseButton({
  onPause,
  onResume,
  pallet,
  ...rest
}: HTMLAttributes<HTMLButtonElement> & {
  onPause: () => void;
  onResume: () => void;
  pallet: ColorUtils.ColorPallet;
}) {}
