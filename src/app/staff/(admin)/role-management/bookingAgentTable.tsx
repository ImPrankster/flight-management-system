"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type InferSelectModel } from "drizzle-orm";
import { DataTable } from "~/components/dataTable";
import { type bookingAgent } from "~/server/db/schema";

const bookingAgentColumn: ColumnDef<InferSelectModel<typeof bookingAgent>>[] = [
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Airline Name",
    accessorKey: "airlineName",
  },
  {
    header: "ID",
    accessorKey: "bookingAgentId",
  },
];
const BookingAgentTable = ({
  data,
}: {
  data: InferSelectModel<typeof bookingAgent>[];
}) => {
  return <DataTable columns={bookingAgentColumn} data={data} />;
};

export default BookingAgentTable;
