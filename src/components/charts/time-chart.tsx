import { TimeUtils } from "../../lib/utils";
import { ChartBase, ChartType, SessionData } from "./base";
import { Charts } from "./charts";

interface ChartProps {
  data: SessionData;
}

interface TimeChartData {
  date: string;
  work: string;
  break: string;
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
        const workMinutes = Math.round(
          sessions
            .filter((s) => s.type === "WORK")
            .reduce((sum, s) => sum + (s.end - s.start), 0) / 60000,
        );
        const breakMinutes = Math.round(
          sessions
            .filter((s) => s.type === "BREAK")
            .reduce((sum, s) => sum + (s.end - s.start), 0) / 60000,
        );

        return {
          date: TimeUtils.simpleFormatDate(date),
          work: workMinutes,
          break: breakMinutes,
        };
      },
    );

    if (chartType === "bar") {
      return (
        <Charts.Bar
          data={chartData}
          workName="Work Time (minutes)"
          breakName="Work Time (minutes)"
          workFill={workFill}
          breakFill={breakFill}
        />
      );
    }
    return (
      <Charts.Area
        data={chartData}
        workFill={workFill}
        breakFill={breakFill}
        workName="Work Time (minutes)"
        breakName="Work Time (minutes)"
      />
    );
  };

  return <ChartBase data={data} renderChart={renderChart} />;
};
