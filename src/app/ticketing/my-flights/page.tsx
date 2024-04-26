import { eq } from "drizzle-orm";
import FlightsTable from "~/components/flightsTable";
import { getUser } from "~/server/auth/getUser";
import { db } from "~/server/db";
import { flight, ticket } from "~/server/db/schema";

export default async function MyFlightsPage() {
  const user = await getUser();
  const data = await db
    //@ts-expect-error: this works
    .select(flight)
    .from(flight)
    .rightJoin(ticket, eq(flight.flightNumber, ticket.flightNumber))
    .where(eq(ticket.customerEmail, user!.email));

  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        My Flights
      </h2>
      {/* @ts-expect-error: this works */}
      <FlightsTable data={data} />
    </main>
  );
}
