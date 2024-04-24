import { type ColumnDef } from "@tanstack/react-table";
import { eq, type InferSelectModel } from "drizzle-orm";
import { DataTable } from "~/components/dataTable";
import { getUser } from "~/server/auth/getUser";
import { db } from "~/server/db";
import { airlineStaff, airplane } from "~/server/db/schema";
import AddAirplaneForm from "./addAirplaneForm";

const airportTableColumn: ColumnDef<InferSelectModel<typeof airplane>>[] = [
  {
    header: "Airplane ID",
    accessorKey: "idNum",
  },
  {
    header: "Airline Name",
    accessorKey: "airlineName",
  },
  {
    header: "Seats Amount",
    accessorKey: "seatsAmount",
  },
];

const AirplaneManagementPage = async () => {
  const user = await getUser();
  const aNResult = await db
    .select({
      airlineName: airlineStaff.airlineName,
    })
    .from(airlineStaff)
    .where(eq(airlineStaff.email, user!.email));
  const airlineName = aNResult[0]!.airlineName;
  const data = await db
    .select()
    .from(airplane)
    .where(eq(airplane.airlineName, airlineName!));

  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Airplane Management
      </h2>
      <div className="grid h-[60vh] grid-cols-2 gap-4">
        <DataTable columns={airportTableColumn} data={data} />
        <AddAirplaneForm />
      </div>
    </main>
  );
};

export default AirplaneManagementPage;
