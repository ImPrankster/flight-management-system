"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type InferSelectModel } from "drizzle-orm";
import { toast } from "sonner";
import { DataTable } from "~/components/dataTable";
import { Button } from "~/components/ui/button";
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

      return <div className="font-medium">{formatted}</div>;
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
  {
    header: "Purchase",
    id: "purchase",
    cell: ({ row }) => {
      return (
        <Button
          onClick={async () => {
            const result = await fetch("/ticketing/search/api/purchase", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                flightNumber: row.getValue("flightNumber"),
              }),
            });
            if (result.ok) {
              toast("Purchase successful", {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                description: `Purchased flight ${row.getValue("flightNumber")} From ${row.getValue("departureAirport")} to ${row.getValue("arrivalAirport")} At ${new Date(row.getValue("departureTime")).toLocaleString()}`,
              });
            } else {
              toast("Purchase failed");
            }
          }}
          className="hover:bg-blue-700"
        >
          Purchase
        </Button>
      );
    },
  },
];

const FlightsTableWithPurchase = ({
  data,
}: {
  data: Array<InferSelectModel<typeof flight>>;
}) => {
  return <DataTable columns={flightsTableColumn} data={data} />;
};

export default FlightsTableWithPurchase;
