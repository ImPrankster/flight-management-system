"use client";

import { Bar, ComposedChart, Label, Tooltip, XAxis, YAxis } from "recharts";

const SpendingDataChart = ({ data }: { data: unknown[] }) => {
  return (
    <ComposedChart data={data} width={1024} height={512}>
      <XAxis dataKey="month">
        <Label value="Month" offset={-4} position="insideBottom" />
      </XAxis>
      <YAxis />
      <Tooltip />
      <Bar dataKey="sum" fill="#020817" />
    </ComposedChart>
  );
};

export default SpendingDataChart;
