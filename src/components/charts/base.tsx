import React, { useState } from "react";
import { ResponsiveContainer } from "recharts";

interface Session {
  start: number;
  end: number;
  type: "BREAK" | "WORK";
}

type SessionData = Record<string, Session[]>;

interface ChartBaseProps {
  data: SessionData;
  renderChart: (filteredData: SessionData) => React.ReactNode;
}

const timeSpans: Record<string, number> = {
  "1 week": 7,
  "2 weeks": 14,
  "3 weeks": 21,
  "4 weeks": 28,
  "1 month": 30,
  "3 months": 90,
  "6 months": 180,
  "1 year": 365,
};

const ChartBase: React.FC<ChartBaseProps> = ({ data, renderChart }) => {
  const [timeSpan, setTimeSpan] = useState<string>("1 month");
  const [showWork, setShowWork] = useState<boolean>(true);
  const [showBreak, setShowBreak] = useState<boolean>(true);

  const filterData = (): SessionData => {
    const days = timeSpans[timeSpan];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return Object.entries(data)
      .filter(([date]) => new Date(date) >= cutoffDate)
      .reduce<SessionData>((acc, [date, sessions]) => {
        acc[date] = sessions.filter(
          (session) =>
            (showWork && session.type === "WORK") ||
            (showBreak && session.type === "BREAK"),
        );
        return acc;
      }, {});
  };

  const filteredData = filterData();

  return (
    <div className="chart-container">
      <div className="controls">
        <select value={timeSpan} onChange={(e) => setTimeSpan(e.target.value)}>
          {Object.keys(timeSpans).map((span) => (
            <option key={span} value={span}>
              {span}
            </option>
          ))}
        </select>
        <label>
          <input
            type="checkbox"
            checked={showWork}
            onChange={() => setShowWork(!showWork)}
          />
          Show Work
        </label>
        <label>
          <input
            type="checkbox"
            checked={showBreak}
            onChange={() => setShowBreak(!showBreak)}
          />
          Show Break
        </label>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        {renderChart(filteredData)}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBase;
export type { SessionData, Session };
