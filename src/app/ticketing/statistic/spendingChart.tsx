"use client";

import { Pie, PieChart, Tooltip } from "recharts";

const SpendingDataChart = ({ data }: { data: unknown[] }) => {
  return (
    <PieChart width={512} height={512}>
      <Tooltip />
      <Pie data={data} dataKey="sum" nameKey="month" fill="#8884d8" label />
    </PieChart>
  );
};

export default SpendingDataChart;
