import { TimeUtils } from "../../lib/utils";
import { ChartBase, ChartType, SessionData } from "./base";
import { Charts } from "./charts";

interface ChartProps {
  data: SessionData;
}

interface TimeChartData {
  date: string;
  work: number;
  break: number;
}

export const TimeChart: React.FC<ChartProps> = ({ data }) => {
  const renderChart = (
    filteredData: SessionData,
    chartType: ChartType,
    workFill: string,
    breakFill: string,
  ) => {
    const chartData: TimeChartData[] = Object.entries(filteredData).map(
      ([date, sessions]) => {
        return {
          date: TimeUtils.simpleFormatDate(date),
          work:
            sessions
              .filter((s) => s.type === "WORK")
              .reduce((sum, s) => sum + (s.end - s.start), 0) / 3600000,
          break:
            sessions
              .filter((s) => s.type === "BREAK")
              .reduce((sum, s) => sum + (s.end - s.start), 0) / 3600000,
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
