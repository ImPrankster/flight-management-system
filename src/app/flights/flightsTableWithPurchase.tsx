"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type InferSelectModel } from "drizzle-orm";
import { toast } from "sonner";
import { DataTable } from "~/components/dataTable";
import { Button } from "~/components/ui/button";
import { type flight } from "~/server/db/schema";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { useState } from "react";

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
      return <PurchaseDialog row={row} />;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PurchaseDialog({ row }: { row: any }) {
  const [email, setEmail] = useState<string>("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-blue-700">Purchase</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete the purchase</DialogTitle>
        </DialogHeader>
        To purchase for someone else, enter the email address of the person
        (Optional).
        <Input
          placeholder="example@example.com"
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
        />
        <DialogFooter>
          <Button
            onClick={async () => {
              const result = await fetch("/flights/api/purchase", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                  flightNumber: row.getValue("flightNumber"),
                  email: email,
                }),
              });

              if (result.ok) {
                toast("Purchase successful", {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
                  description: `Purchased flight ${row.getValue("flightNumber")} From ${row.getValue("departureAirport")} to ${row.getValue("arrivalAirport")} At ${new Date(row.getValue("departureTime")).toLocaleString()}`,
                });
              } else {
                toast("Purchase failed", {
                  description: await result.text(),
                });
              }
            }}
          >
            Purchase for {email || "yourself"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
