import React from "react";
import { cn } from "../lib/utils";

interface CompProps {
  as?: keyof JSX.IntrinsicElements;
}

export function Container({
  children,
  as: Tag = "div",
  ...rest
}: CompProps & React.HTMLAttributes<HTMLOrSVGElement>) {
  return (
    // @ts-ignore
    <Tag
      {...rest}
      className={cn(
        "h-full w-full p-2 container mx-auto max-w-4xl",
        rest.className,
      )}
    >
      {children}
    </Tag>
  );
}
