import { HTMLAttributes, useState } from "react";
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
  const [hover, setHover] = useState(false);
  return (
    <button
      className={cn(
        "p-3 rounded-md flex items-center justify-center z-10",
        className,
      )}
      style={{
        color: pallet.text1,
        fill: pallet.text1,
        backgroundColor: `${pallet.primary1}${hover ? "80" : "50"}`,
        ...style,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
    </button>
  );
}
