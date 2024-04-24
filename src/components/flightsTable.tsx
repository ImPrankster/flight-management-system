import { type ColumnDef } from "@tanstack/react-table";
import { type InferSelectModel } from "drizzle-orm";
import { DataTable } from "~/components/dataTable";
import { type flight } from "~/server/db/schema";

const flightsTableColumn: ColumnDef<InferSelectModel<typeof flight>>[] = [
  {
    header: "Flight Number",
    accessorKey: "flightNumber",
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
  },
  {
    header: "Arrival Time",
    accessorKey: "arrivalTime",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Airplane ID",
    accessorKey: "airplaneIdNum",
  },
  {
    header: "Status",
    accessorKey: "status",
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
