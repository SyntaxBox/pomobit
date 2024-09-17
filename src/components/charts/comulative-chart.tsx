import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
} from "recharts";
import ChartBase, { SessionData } from "./base";

interface ChartProps {
  data: SessionData;
}

interface CumulativeChartData {
  date: string;
  work: number;
  break: number;
}

interface ScatterChartData {
  date: string;
  duration: number;
  type: "BREAK" | "WORK";
}

const CumulativeTimeChart: React.FC<ChartProps> = ({ data }) => {
  const renderChart = (filteredData: SessionData) => {
    let workTotal = 0;
    let breakTotal = 0;
    const chartData: CumulativeChartData[] = Object.entries(filteredData).map(
      ([date, sessions]) => {
        workTotal +=
          sessions
            .filter((s) => s.type === "WORK")
            .reduce((sum, s) => sum + (s.end - s.start), 0) / 3600000;
        breakTotal +=
          sessions
            .filter((s) => s.type === "BREAK")
            .reduce((sum, s) => sum + (s.end - s.start), 0) / 3600000;
        return { date, work: workTotal, break: breakTotal };
      },
    );

    return (
      <AreaChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="work"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
          name="Cumulative Work Time (hours)"
        />
        <Area
          type="monotone"
          dataKey="break"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
          name="Cumulative Break Time (hours)"
        />
      </AreaChart>
    );
  };

  return <ChartBase data={data} renderChart={renderChart} />;
};

const SessionDurationScatterChart: React.FC<ChartProps> = ({ data }) => {
  const renderChart = (filteredData: SessionData) => {
    const chartData: ScatterChartData[] = Object.entries(filteredData).flatMap(
      ([date, sessions]) =>
        sessions.map((session) => ({
          date,
          duration: (session.end - session.start) / 3600000,
          type: session.type,
        })),
    );

    return (
      <ScatterChart>
        <XAxis dataKey="date" />
        <YAxis
          dataKey="duration"
          label={{
            value: "Duration (hours)",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter
          name="Work Sessions"
          data={chartData.filter((d) => d.type === "WORK")}
          fill="#8884d8"
        />
        <Scatter
          name="Break Sessions"
          data={chartData.filter((d) => d.type === "BREAK")}
          fill="#82ca9d"
        />
      </ScatterChart>
    );
  };

  return <ChartBase data={data} renderChart={renderChart} />;
};

export { CumulativeTimeChart, SessionDurationScatterChart };
