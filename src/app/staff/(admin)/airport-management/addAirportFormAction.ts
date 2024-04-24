"use server";

import { revalidatePath } from "next/cache";
import { airportFormSchema } from "~/lib/types";
import { db } from "~/server/db";
import { airport } from "~/server/db/schema";

export async function addAirportForm(formData: FormData) {
  const fd = airportFormSchema.parse({
    name: formData.get("name"),
    city: formData.get("city"),
  });

  try {
    await db.insert(airport).values(fd);
  } catch (e) {
    throw new Error("Failed to add airport");
  }

  revalidatePath("/staff/airport-management");
}
