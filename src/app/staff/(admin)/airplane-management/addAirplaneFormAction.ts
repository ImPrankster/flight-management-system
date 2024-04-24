"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { airplaneFormSchema } from "~/lib/types";
import { getUser } from "~/server/auth/getUser";
import { db } from "~/server/db";
import { airlineStaff, airplane } from "~/server/db/schema";

export async function addAirplaneFormAction(fromData: FormData) {
  const fd = airplaneFormSchema.parse({
    seatsAmount: fromData.get("seatsAmount"),
  });
  const user = await getUser();
  const aNResult = await db
    .select({
      airlineName: airlineStaff.airlineName,
    })
    .from(airlineStaff)
    .where(eq(airlineStaff.email, user!.email));
  const airlineName = aNResult[0]!.airlineName;
  const { seatsAmount } = fd;

  try {
    await db.insert(airplane).values({ seatsAmount, airlineName });
  } catch (e) {
    throw new Error("Failed to add airplane");
  }

  revalidatePath("/staff/airplane-management");
}
