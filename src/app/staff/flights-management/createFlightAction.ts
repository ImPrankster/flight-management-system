"use server";

import { createFlightFormSchema } from "~/lib/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getUser } from "~/server/auth/getUser";
import { db } from "~/server/db";
import { airlineStaff, flight } from "~/server/db/schema";

export async function createFlightAction(formData: FormData) {
  const fd = createFlightFormSchema.parse({
    airlineName: formData.get("airlineName"),
    departureAirport: formData.get("departureAirport"),
    departureTime: formData.get("departureTime"),
    arrivalAirport: formData.get("arrivalAirport"),
    arrivalTime: formData.get("arrivalTime"),
    price: formData.get("price"),
    airplaneIdNum: formData.get("airplaneIdNum"),
    status: formData.get("status"),
  });
  const user = await getUser();
  const aNResult = await db
    .select({
      airlineName: airlineStaff.airlineName,
    })
    .from(airlineStaff)
    .where(eq(airlineStaff.email, user!.email));
  const airlineName = aNResult[0]!.airlineName;

  try {
    await db.insert(flight).values({ ...fd, airlineName: airlineName });
  } catch (e) {
    throw new Error("Failed to add flight");
  }

  revalidatePath("/staff/flights-management");
}
