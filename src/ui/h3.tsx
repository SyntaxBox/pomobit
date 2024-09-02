import { cn } from "../lib/utils";

export function H3({
  className,
  children,
  ...rest
}: JSX.IntrinsicElements["h3"]) {
  return (
    <h3
      {...rest}
      className={cn(
        "text-xl md:text-2xl mt-4 mb-1 font-medium capitalize",
        className,
      )}
    >
      {children}
    </h3>
  );
}
