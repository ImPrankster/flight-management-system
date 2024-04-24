import { db } from "~/server/db";
import { airlineStaff } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function getAirlineStaffPermission(email: string) {
  const pResult = await db
    .select({ permission: airlineStaff.permission })
    .from(airlineStaff)
    .where(eq(airlineStaff.email, email));
  const permission = pResult[0]!.permission ? pResult[0]!.permission : 0;
  return permission;
}
