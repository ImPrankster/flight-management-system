import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { db } from "~/server/db";
import { flight } from "~/server/db/schema";

const FlightsPage = async () => {
  const data = await db.select().from(flight);
  return (
    <main className="flex flex-col p-4">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Flights
      </h2>
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flight Number</TableHead>
              <TableHead>Airline Name</TableHead>
              <TableHead>Departure Airport</TableHead>
              <TableHead>Departure Time</TableHead>
              <TableHead>Arrival Airport</TableHead>
              <TableHead>Arrival Time</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>AIN</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((flight) => (
              <TableRow key={flight.flightNumber}>
                <TableCell className="font-mono">
                  {flight.flightNumber}
                </TableCell>
                <TableCell>{flight.airlineName}</TableCell>
                <TableCell className="uppercase">
                  {flight.departureAirport}
                </TableCell>
                <TableCell className="font-mono">
                  {flight.departureTime}
                </TableCell>
                <TableCell>{flight.arrivalAirport}</TableCell>
                <TableCell className="font-mono">
                  {flight.arrivalTime}
                </TableCell>
                <TableCell className="font-mono">{flight.price}</TableCell>
                <TableCell className="font-mono">
                  {flight.airplaneIdentificationNumber}
                </TableCell>
                <TableCell className="uppercase">{flight.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default FlightsPage;
