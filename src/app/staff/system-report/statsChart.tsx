"use client";

import { Pie, PieChart, Tooltip } from "recharts";

const StatsChart = ({ data }: { data: unknown[] }) => {
  return (
    <PieChart width={256} height={256} className="place-self-center">
      <Tooltip />
      <Pie data={data} dataKey="sum" nameKey="key" fill="#227D51" label />
    </PieChart>
  );
};

export default StatsChart;
