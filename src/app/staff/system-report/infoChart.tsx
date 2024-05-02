"use client";

import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

const InfoChart = ({ data, color }: { data: unknown[]; color: string }) => {
  return (
    <BarChart width={720} height={250} data={data}>
      <XAxis dataKey="key" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill={color} />
    </BarChart>
  );
};

export default InfoChart;
