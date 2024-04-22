import { eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "~/server/db";
import { airlineStaff, bookingAgent, customer } from "~/server/db/schema";

export const getUserType = cache(
  async (
    email: string,
  ): Promise<
    "customer" | "airline-staff" | "booking-agent" | "unspecified"
  > => {
    if (
      (
        await db
          .selectDistinct()
          .from(customer)
          .where(eq(customer.email, email))
      ).length !== 0
    ) {
      return "customer";
    }
    if (
      (
        await db
          .selectDistinct()
          .from(airlineStaff)
          .where(eq(airlineStaff.email, email))
      ).length !== 0
    ) {
      return "airline-staff";
    }
    if (
      (
        await db
          .selectDistinct()
          .from(bookingAgent)
          .where(eq(bookingAgent.email, email))
      ).length !== 0
    ) {
      return "booking-agent";
    }

    return "unspecified";
  },
);
