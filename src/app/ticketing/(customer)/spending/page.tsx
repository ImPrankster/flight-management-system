import { eq, sql, sum } from "drizzle-orm";
import { getUser } from "~/server/auth/getUser";
import { db } from "~/server/db";
import { flight, ticket } from "~/server/db/schema";
import dynamic from "next/dynamic";
const SpendingDataChart = dynamic(() => import("./chart"), { ssr: false });

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

  const total = result.reduce(
    (acc, { sum }) => acc + parseFloat(sum ? sum : "0"),
    0,
  );

  console.log(result);

  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        My Spending
      </h2>
      <h3 className="ml-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Total Spending:{" "}
        <span>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(total)}
        </span>
      </h3>
      <h3 className="ml-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Spending Breakdown
      </h3>
      <SpendingDataChart data={result} />
    </main>
  );
}
