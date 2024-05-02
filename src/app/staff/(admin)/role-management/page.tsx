import { eq } from "drizzle-orm";
import { getUser } from "~/server/auth/getUser";
import { db } from "~/server/db";
import { airlineStaff, bookingAgent } from "~/server/db/schema";
import StaffDataTable from "./staffDataTable";
import BookingAgentTable from "./bookingAgentTable";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const RoleManagementPage = async () => {
  const user = await getUser();
  const airline = (
    await db
      .select({ name: airlineStaff.airlineName })
      .from(airlineStaff)
      .where(eq(airlineStaff.email, user!.email))
  )[0]!.name;

  const staffData = await db
    .select()
    .from(airlineStaff)
    .where(eq(airlineStaff.airlineName, airline));

  const bookingAgentData = await db
    .select()
    .from(bookingAgent)
    .where(eq(bookingAgent.airlineName, airline));

  async function addBookingAgent(formData: FormData) {
    "use server";

    const fd = z.object({ email: z.string() }).parse({
      email: formData.get("email"),
    });

    try {
      await db.insert(bookingAgent).values({
        email: fd.email,
        airlineName: airline,
      });
      revalidatePath("/staff/(admin)/role-management");
    } catch (e) {
      throw new Error("Failed to add booking agent");
    }
  }

  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Role Management
      </h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div>
          <h3 className="ml-2 scroll-m-20 text-xl font-semibold tracking-tight">
            Airline Staff
          </h3>
          <StaffDataTable data={staffData} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="ml-2 scroll-m-20 text-xl font-semibold tracking-tight">
            Booking Agent
          </h3>
          <span className="ml-2 text-sm font-medium leading-none">
            Add new booking agent:
          </span>
          <form
            action={addBookingAgent}
            className="flex place-items-center gap-2"
          >
            <Input name="email" placeholder="example@example.com" />
            <Button type="submit">Submit</Button>
          </form>
          <BookingAgentTable data={bookingAgentData} />
        </div>
      </div>
    </main>
  );
};

export default RoleManagementPage;
