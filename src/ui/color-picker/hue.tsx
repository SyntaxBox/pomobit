import React from "react";

import { Interactive, Interaction } from "./interactive";
import { Pointer } from "./pointer";

import { cn } from "../../lib/utils";

import { ColorUtils } from "../../lib/utils";

const { clamp, round, hsvaToHslString } = ColorUtils;

export function HueBase({
  className,
  hue,
  onChange,
}: {
  className?: string;
  hue: number;
  onChange: (newHue: { h: number }) => void;
}) {
  const handleMove = (interaction: Interaction) => {
    onChange({ h: 359 * interaction.left });
  };

  const handleKey = (offset: Interaction) => {
    // Hue measured in degrees of the color circle ranging from 0 to 360
    onChange({
      h: clamp(hue + offset.left * 360, 0, 360),
    });
  };

  const background = ` linear-gradient(
    to right,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  )`;
  return (
    <div
      className={cn("relative h-10 rounded-xl", className)}
      style={{
        background,
      }}
    >
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Hue"
        aria-valuenow={round(hue)}
        aria-valuemax="360"
        aria-valuemin="0"
      >
        <Pointer
          left={hue / 360}
          color={hsvaToHslString({ h: hue, s: 100, v: 100, a: 1 })}
        />
      </Interactive>
    </div>
  );
}

export const Hue = React.memo(HueBase);
