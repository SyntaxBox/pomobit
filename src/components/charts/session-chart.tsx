import React from "react";
import { ChartBase, SessionData } from "./base";
import { Charts } from "./charts";
import { TimeUtils } from "../../lib/utils";

interface ChartProps {
  data: SessionData;
}

interface SessionChartData {
  date: string;
  work: number;
  break: number;
}

export const SessionsChart: React.FC<ChartProps> = ({ data }) => {
  const renderChart = (
    filteredData: SessionData,
    chartType: string,
    workFill: string,
    breakFill: string,
  ) => {
    const chartData: SessionChartData[] = Object.entries(filteredData).map(
      ([date, sessions]) => {
        return {
          date: TimeUtils.simpleFormatDate(date),
          work: sessions.filter((s) => s.type === "WORK").length,
          break: sessions.filter((s) => s.type === "BREAK").length,
        };
      },
    );

    if (chartType === "bar") {
      return (
        <Charts.Bar
          data={chartData}
          workFill={workFill}
          breakFill={breakFill}
        />
      );
    }
    return (
      <Charts.Area data={chartData} workFill={workFill} breakFill={breakFill} />
    );
  };

  return <ChartBase data={data} renderChart={renderChart} />;
};
