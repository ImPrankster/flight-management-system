import { db } from "~/server/db";
import { airport } from "~/server/db/schema";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/dataTable";
import AddAirportForm from "./addAirportForm";

const airportTableColumn: ColumnDef<{
  name: string;
  city: string | null;
}>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "City",
    accessorKey: "city",
  },
];

const AirportManagePage = async () => {
  const airports = await db.select().from(airport).limit(255);

  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Airport Management
      </h2>
      <div className="grid h-[60vh] grid-cols-2 gap-4">
        <DataTable columns={airportTableColumn} data={airports} />
        <AddAirportForm />
      </div>
    </main>
  );
};

export default AirportManagePage;
