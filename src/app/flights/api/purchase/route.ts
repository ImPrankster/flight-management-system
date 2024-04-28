import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getUser } from "~/server/auth/getUser";
import { getUserType } from "~/server/auth/getUserType";
import { db } from "~/server/db";
import { bookingAgent, ticket } from "~/server/db/schema";

export async function POST(req: Request) {
  const param = z
    .object({
      flightNumber: z.coerce.number(),
      email: z.string(),
    })
    .parse(await req.json());

  const user = await getUser();

  if (!user) {
    return new Response("Unauthorized, please sign in", { status: 401 });
  }

  const userType = await getUserType(user.email);

  if (userType == "customer") {
    try {
      await db.insert(ticket).values({
        customerEmail: param.email ? param.email : user.email,
        flightNumber: param.flightNumber,
      });
      revalidatePath("/ticketing/my-flights");
      revalidatePath("/ticketing/spending");
      return new Response("Purchased", { status: 200 });
    } catch (e) {
      return new Response("Failed to purchase", { status: 400 });
    }
  } else if (userType == "booking-agent") {
    try {
      const bookingAgentId = await db
        .selectDistinct({ bookingAgentId: bookingAgent.bookingAgentId })
        .from(bookingAgent)
        .where(eq(bookingAgent.email, user.email));
      await db.insert(ticket).values({
        bookingAgentId: bookingAgentId[0]?.bookingAgentId,
        customerEmail: param.email,
        flightNumber: param.flightNumber,
      });
      revalidatePath("/ticketing/my-flights");
      revalidatePath("/ticketing/statistics");
      revalidatePath("/ticketing/spending");
      return new Response("Purchased", { status: 200 });
    } catch (e) {
      return new Response("Failed to purchase", { status: 400 });
    }
  } else {
    return new Response("Failed to purchase", { status: 400 });
  }
}
