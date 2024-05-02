"use client";

import { type Row, type ColumnDef } from "@tanstack/react-table";
import { type InferSelectModel } from "drizzle-orm";
import { DataTable } from "~/components/dataTable";
import { type airlineStaff } from "~/server/db/schema";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "~/components/ui/select";

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
    header: "Airline Name",
    accessorKey: "airlineName",
  },
  {
    header: "Permission",
    accessorKey: "permission",
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => {
      return <PermDialog row={row} />;
    },
  },
];
const StaffDataTable = ({
  data,
}: {
  data: InferSelectModel<typeof airlineStaff>[];
}) => {
  return <DataTable columns={staffTableColumn} data={data} />;
};

function PermDialog({
  row,
}: {
  row: Row<{
    email: string;
    firstName: string | null;
    lastName: string | null;
    dateOfBirth: string | null;
    airlineName: string;
    permission: number;
  }>;
}) {
  const [permission, setPermission] = useState<number>(
    row.getValue("permission"),
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-blue-700">Update</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Role Permission</DialogTitle>
        </DialogHeader>
        <Select
          onValueChange={(e) => {
            setPermission(parseInt(e));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select permission" />
          </SelectTrigger>
          <SelectContent defaultValue={`${permission}`}>
            <SelectItem value="2">Admin</SelectItem>
            <SelectItem value="1">Operator</SelectItem>
            <SelectItem value="0">None</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button
            onClick={async () => {
              const result = await fetch(
                "/staff/role-management/api/permission",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: row.getValue("email"),
                    permission: permission,
                  }),
                },
              );

              if (result.ok) {
                toast("Update successful");
              } else {
                toast("Update failed", {
                  description: await result.text(),
                });
              }
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default StaffDataTable;
