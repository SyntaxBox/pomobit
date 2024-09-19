import { useState, useRef, useEffect } from "react";
import HeatMap, { HeatMapValue } from "@uiw/react-heat-map";
import { cn, ColorUtils, TimeUtils } from "../lib/utils";
import { Tooltip } from "react-tooltip"; // Import react-tooltip

export function HeatCalendar({
  pallet,
  data,
  tooltipPrefix,
}: {
  pallet: ColorUtils.ColorPallet;
  tooltipPrefix?: string;
  data: HeatMapValue[];
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (
        divRef.current &&
        divRef.current?.scrollWidth > divRef.current?.clientWidth
      ) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow); // Check again on window resize

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const shadesRecord = Object.fromEntries(
    ColorUtils.generateShades(pallet.original, 10).map((c, i) => [3 * i, c]),
  );

  return (
    <div
      className={cn(isOverflowing ? "overflow-x-scroll" : "overflow-x-auto")}
      ref={divRef}
    >
      <HeatMap
        value={data}
        legendCellSize={0}
        width={1500}
        rectSize={1500 / (48 + 10.2)}
        height={220}
        className="mx-auto"
        panelColors={shadesRecord}
        startDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
        endDate={new Date(Date.now())}
        rectProps={{
          rx: 5,
        }}
        rectRender={(props, data) => {
          const tooltipContent = `${TimeUtils.simpleFormatDate(data.date)}: ${
            data?.count || 0
          } ${tooltipPrefix || ""}`;

          return (
            <rect
              {...props}
              data-tooltip-id="heatmap-tooltip" // Associate with tooltip ID
              data-tooltip-content={tooltipContent} // Tooltip content
              style={{ cursor: "pointer" }}
            />
          );
        }}
      />

      {/* Tooltip Component */}
      <Tooltip
        id="heatmap-tooltip"
        place="top"
        style={{
          backgroundColor: pallet.background2,
          color: pallet.text1,
        }}
      />
    </div>
  );
}
