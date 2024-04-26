import { eq, sql, sum } from "drizzle-orm";
import { getUser } from "~/server/auth/getUser";
import { db } from "~/server/db";
import { flight, ticket } from "~/server/db/schema";
import SpendingDataChart from "./chart";

export default async function SpendingPage() {
  const user = await getUser();
  const result = await db
    .select({
      month: sql`MONTH(${flight.departureTime})`,
      sum: sum(flight.price),
    })
    .from(ticket)
    .leftJoin(flight, eq(ticket.flightNumber, flight.flightNumber))
    .where(eq(ticket.customerEmail, user!.email))
    .groupBy(sql`MONTH(${flight.departureTime})`);

  console.log(result);

  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        My Spending
      </h2>
      {/* <h3 className="ml-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Total Spending:{" "}
        <span>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(total)}
        </span>
      </h3> */}
      <SpendingDataChart data={result} />
    </main>
  );
}
