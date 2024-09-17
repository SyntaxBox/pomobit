import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import ChartBase, { SessionData } from "./base";

interface ChartProps {
  data: SessionData;
}

interface SessionChartData {
  date: string;
  work: number;
  break: number;
}

const SessionsChart: React.FC<ChartProps> = ({ data }) => {
  const renderChart = (filteredData: SessionData) => {
    const chartData: SessionChartData[] = Object.entries(filteredData).map(
      ([date, sessions]) => ({
        date,
        work: sessions.filter((s) => s.type === "WORK").length,
        break: sessions.filter((s) => s.type === "BREAK").length,
      }),
    );

    return (
      <BarChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="work" fill="#8884d8" name="Work Sessions" />
        <Bar dataKey="break" fill="#82ca9d" name="Break Sessions" />
      </BarChart>
    );
  };

  return <ChartBase data={data} renderChart={renderChart} />;
};

const TimeChart: React.FC<ChartProps> = ({ data }) => {
  const renderChart = (filteredData: SessionData) => {
    const chartData: SessionChartData[] = Object.entries(filteredData).map(
      ([date, sessions]) => ({
        date,
        work:
          sessions
            .filter((s) => s.type === "WORK")
            .reduce((sum, s) => sum + (s.end - s.start), 0) / 3600000,
        break:
          sessions
            .filter((s) => s.type === "BREAK")
            .reduce((sum, s) => sum + (s.end - s.start), 0) / 3600000,
      }),
    );

    return (
      <BarChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="work" fill="#8884d8" name="Work Time (hours)" />
        <Bar dataKey="break" fill="#82ca9d" name="Break Time (hours)" />
      </BarChart>
    );
  };

  return <ChartBase data={data} renderChart={renderChart} />;
};

export { SessionsChart, TimeChart };
