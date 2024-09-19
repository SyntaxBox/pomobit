import {
  BarChart,
  Bar as ChartBar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area as ChartArea,
  ResponsiveContainer,
} from "recharts";

function Area({
  data,
  workFill,
  breakFill,
  workName,
  breakName,
}: {
  data: unknown[];
  workFill: string;
  breakFill: string;
  workName: string;
  breakName: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <defs>
          <linearGradient id="workGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={workFill} stopOpacity={0.8} />
            <stop offset="95%" stopColor={workFill} stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="breakGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={breakFill} stopOpacity={0.8} />
            <stop offset="95%" stopColor={breakFill} stopOpacity={0.2} />
          </linearGradient>
        </defs>{" "}
        <Legend />
        <ChartArea
          type="monotone"
          dataKey="work"
          stackId="1"
          stroke={workFill}
          fillOpacity={1}
          fill="url(#workGradient)"
          name={workName}
        />
        <ChartArea
          type="monotone"
          dataKey="break"
          stackId="1"
          stroke={breakFill}
          fillOpacity={1}
          fill="url(#breakGradient)"
          name={breakName}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function Bar({
  data,
  workFill,
  breakFill,
  workName,
  breakName,
}: {
  data: unknown[];
  workFill: string;
  breakFill: string;
  breakName: string;
  workName: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ChartBar dataKey="work" fill={workFill} name={workName} />
        <ChartBar dataKey="break" fill={breakFill} name={breakName} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export const Charts = {
  Bar,
  Area,
};
