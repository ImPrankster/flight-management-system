"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { updateFlightFormSchema } from "~/lib/types";
import { db } from "~/server/db";
import { flight } from "~/server/db/schema";

export async function updateFlight(formData: FormData) {
  const fd = updateFlightFormSchema.parse({
    flightNumber: formData.get("flightNumber"),
    newStatus: formData.get("newStatus"),
  });

  try {
    await db
      .update(flight)
      .set({ status: fd.newStatus })
      .where(eq(flight.flightNumber, fd.flightNumber));
  } catch (e) {
    throw new Error("Failed to update flight.");
  }
  revalidatePath("/staff/flights-management");
}
