import { cn } from "../../lib/utils";

interface Props {
  className?: string;
  top?: number;
  left: number;
  color: string;
}

export const Pointer = ({
  className,
  color,
  left,
  top = 0.5,
}: Props): JSX.Element => {
  return (
    <div
      className={cn(
        "absolute z-[1] w-12 h-12 -translate-x-1/2 -translate-y-1/2 bg-white border-white border-[3px] rounded-full parent-focus-scale",
        className,
      )}
      style={{
        top: `${top * 100}%`,
        left: `${left * 100}%`,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};
