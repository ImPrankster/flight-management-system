import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getAirlineStaffPermission } from "~/server/auth/getAirlineStaffPermission";
import { getUser } from "~/server/auth/getUser";
import { db } from "~/server/db";
import { airlineStaff } from "~/server/db/schema";

export async function POST(req: Request) {
  const param = z
    .object({
      email: z.string().email(),
      permission: z.number(),
    })
    .parse(await req.json());

  const user = await getUser();
  if ((await getAirlineStaffPermission(user!.email)) !== 2) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await db
      .update(airlineStaff)
      .set({ permission: param.permission })
      .where(eq(airlineStaff.email, param.email));

    revalidatePath("/staff/(admin)/role-management");
    return new Response("Success", { status: 200 });
  } catch (e) {
    return new Response("Failed to update", { status: 500 });
  }
}
