import React, { useState } from "react";
import { Select, Switch } from "../../ui";
import { useUI } from "../../hooks";
import { Session } from "../../stores";

export type SessionData = Record<string, Session[]>;
export type ChartType = "bar" | "area";

const timeSpans: Record<string, number> = {
  "1 week": 7,
  "2 weeks": 14,
  "3 weeks": 21,
  "1 month": 30,
  "3 months": 90,
  "6 months": 180,
  "1 year": 365,
};

const chartTypes: Record<string, ChartType> = {
  "Bar Chart": "bar",
  "Area Chart": "area",
};

export function ChartBase({
  data,
  renderChart,
}: {
  data: SessionData;
  renderChart: (
    filteredData: SessionData,
    chartType: ChartType,
    workFill: string,
    breakFill: string,
  ) => React.ReactElement;
}) {
  const { workPallet, breakPallet, currentPallet } = useUI();
  const [timeSpan, setTimeSpan] = useState<string>("1 month");
  const [chartType, setChartType] = useState<string>("Bar Chart");
  const [showWork, setShowWork] = useState<boolean>(true);
  const [showBreak, setShowBreak] = useState<boolean>(true);

  const filterData = (): SessionData => {
    const days = timeSpans[timeSpan];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const result: SessionData = {};
    for (
      let d = new Date(cutoffDate);
      d <= new Date();
      d.setDate(d.getDate() + 1)
    ) {
      const dateString = d.toISOString().split("T")[0];
      result[dateString] = [];
    }

    Object.entries(data).forEach(([date, sessions]) => {
      if (new Date(date) >= cutoffDate) {
        result[date] = sessions.filter(
          (session) =>
            (showWork && session.type === "WORK") ||
            (showBreak && session.type === "BREAK"),
        );
      }
    });

    return result;
  };

  const filteredData = filterData();

  return (
    <div className="chart-container">
      <div className="flex gap-3 items-center">
        <Select
          pallet={currentPallet}
          options={timeSpans}
          value={timeSpan}
          onChange={(e) => setTimeSpan(e[0])}
        />
        <Select
          pallet={currentPallet}
          options={chartTypes}
          value={chartType}
          onChange={(e) => setChartType(e[0])}
        />
        <label
          className="flex items-center justify-center gap-1 w-fit"
          style={{
            color: breakPallet.text1,
          }}
        >
          <Switch
            value={showWork}
            pallet={workPallet}
            onChange={() => setShowWork(!showWork)}
          />
          Show Work
        </label>
        <label
          className="flex items-center justify-center gap-1 w-fit"
          style={{
            color: breakPallet.text1,
          }}
        >
          <Switch
            pallet={breakPallet}
            value={showBreak}
            onChange={() => setShowBreak(!showBreak)}
          />
          Show Break
        </label>
      </div>
      {renderChart(
        filteredData,
        chartTypes[chartType],
        workPallet.primary1,
        breakPallet.primary1,
      )}
    </div>
  );
}
