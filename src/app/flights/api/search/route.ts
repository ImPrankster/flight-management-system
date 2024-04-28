import { sql } from "drizzle-orm";
import { searchFlightsFormSchema } from "~/lib/types";
import { db } from "~/server/db";
import { flight } from "~/server/db/schema";

export async function POST(req: Request) {
  const param = searchFlightsFormSchema.parse(await req.json());

  const result = await db
    .select()
    .from(flight)
    .where(
      sql.raw(
        `${param.arrivalAirport ? `arrival_airport = '${param.arrivalAirport}'` : "TRUE"} AND ${param.departureAirport ? `departure_airport = '${param.departureAirport}'` : "TRUE"} AND ${param.departureDate ? `DATE(departure_time) = '${param.departureDate}'` : "TRUE"}`,
      ),
    );

  return Response.json(result);
}
