"use client";

import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

const CustomerChart = ({ data }: { data: unknown[] }) => {
  return (
    <>
      <BarChart width={720} height={250} data={data}>
        <XAxis dataKey="customer" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sum" fill="#8884d8" />
      </BarChart>
      <BarChart width={720} height={250} data={data}>
        <XAxis dataKey="customer" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#DB4D6D" />
      </BarChart>
    </>
  );
};

export default CustomerChart;
