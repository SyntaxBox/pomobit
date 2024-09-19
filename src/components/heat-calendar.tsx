import { useState, MouseEvent } from "react";
import HeatMap, { HeatMapValue } from "@uiw/react-heat-map";
import { ColorUtils, TimeUtils } from "../lib/utils";

// Define the structure of the tooltip data
interface TooltipState {
  visible: boolean;
  data: HeatMapValue | null;
  x: number;
  y: number;
}

export function HeatCalendar({
  pallet,
  data,
}: {
  pallet: ColorUtils.ColorPallet;
  data: HeatMapValue[];
}) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    data: null,
    x: 0,
    y: 0,
  });

  const handleMouseEnter = (
    e: MouseEvent<SVGRectElement>,
    data: HeatMapValue,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      data,
      x: rect.left + window.scrollX + rect.width / 2 - 100,
      y: rect.top + window.scrollY - 50,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, data: null, x: 0, y: 0 });
  };

  const shadesRecord = Object.fromEntries(
    ColorUtils.generateShades(pallet.original, 10).map((c, i) => [3 * i, c]),
  );
  return (
    <div className="relative">
      <HeatMap
        value={data}
        legendCellSize={0}
        width={1200}
        rectSize={20}
        className="mx-auto"
        panelColors={shadesRecord}
        startDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
        endDate={new Date(Date.now())}
        rectProps={{
          rx: 5,
        }}
        rectRender={(props, data) => {
          return (
            <rect
              {...props}
              onMouseEnter={(e) => handleMouseEnter(e, data)}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: "pointer" }}
            />
          );
        }}
      />
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x,
            top: tooltip.y,
            backgroundColor: pallet.background2,
            color: pallet.text1,
            padding: "5px 10px",
            borderRadius: "4px",
            fontSize: "12px",
            pointerEvents: "none",
            transform: "translate(-50%, -100%)",
            whiteSpace: "nowrap",
          }}
        >
          {tooltip.data && TimeUtils.simpleFormatDate(tooltip.data.date)}:{" "}
          {tooltip.data?.count || 0} Work Shifts
        </div>
      )}
    </div>
  );
}
