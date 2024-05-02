import { and, eq, or, sql, sum } from "drizzle-orm";
import { z } from "zod";
import { getUser } from "~/server/auth/getUser";
import { db } from "~/server/db";
import { bookingAgent, flight, ticket } from "~/server/db/schema";

export async function POST(req: Request) {
  const param = z
    .object({
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
    })
    .parse(await req.json());

  const user = await getUser();

  const { bookingAgentId } =
    (
      await db
        .select({ bookingAgentId: bookingAgent.bookingAgentId })
        .from(bookingAgent)
        .where(eq(bookingAgent.email, user!.email))
    )[0] ?? {};

  const result = await db
    .select({
      month: sql<string>`MONTH(${flight.departureTime})`,
      year: sql<string>`YEAR(${flight.departureTime})`,
      sum: sum(flight.price),
    })
    .from(ticket)
    .leftJoin(flight, eq(ticket.flightNumber, flight.flightNumber))
    .where(
      and(
        or(
          eq(ticket.customerEmail, user!.email),
          eq(ticket.bookingAgentId, bookingAgentId ?? -1),
        ),
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
