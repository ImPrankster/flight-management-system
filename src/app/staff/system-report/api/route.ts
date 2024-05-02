import { and, eq, sql, count } from "drizzle-orm";
import { z } from "zod";
import { getUser } from "~/server/auth/getUser";
import { db } from "~/server/db";
import { airlineStaff, flight, ticket } from "~/server/db/schema";

export async function POST(req: Request) {
  const param = z
    .object({
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
    })
    .parse(await req.json());

  const user = await getUser();

  const airlineName = (
    await db
      .select({ name: airlineStaff.airlineName })
      .from(airlineStaff)
      .where(eq(airlineStaff.email, user!.email))
  )[0]!.name;

  const result = await db
    .select({
      month: sql<string>`MONTH(${flight.departureTime})`,
      year: sql<string>`YEAR(${flight.departureTime})`,
      sum: count(ticket.ticketId),
    })
    .from(ticket)
    .leftJoin(flight, eq(ticket.flightNumber, flight.flightNumber))
    .where(
      and(
        eq(flight.airlineName, airlineName),
        sql.raw(
          `DATE(Flight.departure_time) BETWEEN DATE('${param.startDate.toISOString().split("T")[0]}') AND DATE('${param.endDate.toISOString().split("T")[0]}')`,
        ),
      ),
    )
    .groupBy(
      sql`MONTH(${flight.departureTime})`,
      sql`YEAR(${flight.departureTime})`,
    );

  return Response.json(result);
}
