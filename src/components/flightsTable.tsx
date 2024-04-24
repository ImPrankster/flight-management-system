"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type InferSelectModel } from "drizzle-orm";
import { DataTable } from "~/components/dataTable";
import { type flight } from "~/server/db/schema";

const flightsTableColumn: ColumnDef<InferSelectModel<typeof flight>>[] = [
  {
    header: "Flight Number",
    accessorKey: "flightNumber",
    cell: ({ row }) => {
      const val: string = row.getValue("flightNumber");
      return <div className="font-mono">{val}</div>;
    },
  },
  {
    header: "Airline Name",
    accessorKey: "airlineName",
  },
  {
    header: "Departure Airport",
    accessorKey: "departureAirport",
  },
  {
    header: "Arrival Airport",
    accessorKey: "arrivalAirport",
  },
  {
    header: "Departure Time",
    accessorKey: "departureTime",
    cell: ({ row }) => {
      const date = new Date(row.getValue("departureTime"));
      return (
        <div className="font-mono">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </div>
      );
    },
  },
  {
    header: "Arrival Time",
    accessorKey: "arrivalTime",
    cell: ({ row }) => {
      const date = new Date(row.getValue("arrivalTime"));
      return (
        <div className="font-mono">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </div>
      );
    },
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    header: "Airplane ID",
    accessorKey: "airplaneIdNum",
    cell: ({ row }) => {
      const val: string = row.getValue("airplaneIdNum");
      return <div className="font-mono">{val}</div>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const val: string = row.getValue("status");
      return <div className="font-mono uppercase">{val}</div>;
    },
  },
];

const FlightsTable = ({
  data,
}: {
  data: Array<InferSelectModel<typeof flight>>;
}) => {
  return <DataTable columns={flightsTableColumn} data={data} />;
};

export default FlightsTable;
