import { HTMLAttributes } from "react";
import { cn, ColorUtils } from "../lib/utils";

export function Button({
  className,
  children,
  pallet,
  style,
  ...rest
}: HTMLAttributes<HTMLButtonElement> & {
  pallet: ColorUtils.ColorPallet;
}) {
  return (
    <button
      className={cn(
        "p-3 rounded-lg flex items-center justify-center",
        className,
      )}
      style={{
        background: pallet.primary1,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
