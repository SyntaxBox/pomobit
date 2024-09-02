import { cn } from "../lib/utils";

export function H2({
  className,
  children,
  ...rest
}: JSX.IntrinsicElements["h2"]) {
  return (
    <h2
      {...rest}
      className={cn("text-3xl md:text-4xl font-bold capitalize", className)}
    >
      {children}
    </h2>
  );
}
