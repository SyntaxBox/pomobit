import { HtmlHTMLAttributes } from "react";
import { Button } from "./button";
import { cn, ColorUtils } from "../lib/utils";
import { Link } from "react-router-dom";

export function LinkButton({
  to,
  ...rest
}: HtmlHTMLAttributes<HTMLButtonElement> & {
  to: string;
  pallet: ColorUtils.ColorPallet;
}) {
  return (
    <Link to={to}>
      <Button className={cn("p-2")} {...rest} />
    </Link>
  );
}
