"use client";

import {
  Bar,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SpendingDataChart = ({ data }: { data: unknown[] }) => {
  return (
    <ComposedChart data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="sum" fill="#8884d8" />
      <Line type="monotone" dataKey="sum" stroke="#ff7300" />
    </ComposedChart>
  );
};

export default SpendingDataChart;
