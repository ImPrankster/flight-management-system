"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type InferSelectModel } from "drizzle-orm";
import { DataTable } from "~/components/dataTable";
import { type airlineStaff } from "~/server/db/schema";

const staffTableColumn: ColumnDef<InferSelectModel<typeof airlineStaff>>[] = [
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "First Name",
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Permission",
    accessorKey: "permission",
  },
];
const StaffDataTable = ({
  data,
}: {
  data: InferSelectModel<typeof airlineStaff>[];
}) => {
  return <DataTable columns={staffTableColumn} data={data} />;
};

export default StaffDataTable;
