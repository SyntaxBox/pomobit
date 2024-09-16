import { HtmlHTMLAttributes } from "react";
import { Button } from "./button";
import { cn, ColorUtils } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export function LinkButton({
  to,
  ...rest
}: HtmlHTMLAttributes<HTMLButtonElement> & {
  to: string;
  pallet: ColorUtils.ColorPallet;
}) {
  const navigate = useNavigate();
  return (
    <Button className={cn("p-2")} onClick={() => navigate(to)} {...rest} />
  );
}
