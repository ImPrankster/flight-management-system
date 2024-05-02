import { eq } from "drizzle-orm";
import { getUser } from "~/server/auth/getUser";
import { db } from "~/server/db";
import { airlineStaff } from "~/server/db/schema";
import StaffDataTable from "./staffDataTable";

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
      </div>
    </main>
  );
};

export default RoleManagementPage;
