import { cn } from "../lib/utils";

export function H4({
  className,
  children,
  ...rest
}: JSX.IntrinsicElements["h4"]) {
  return (
    <h4
      {...rest}
      className={cn(
        "text-lg md:text-xl mt-4 mb-1 font-medium capitalize",
        className,
      )}
    >
      {children}
    </h4>
  );
}
