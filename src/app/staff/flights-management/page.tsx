import { getAirlineStaffPermission } from "~/server/auth/getAirlineStaffPermission";
import { getUser } from "~/server/auth/getUser";
import { db } from "~/server/db";
import { airlineStaff, flight } from "~/server/db/schema";
import FlightsTable from "../../../components/flightsTable";
import UpdateFlight from "./updateFlight";
import CreateFlight from "./createFlight";
import { desc, eq, sql } from "drizzle-orm";

const FlightsManagementPage = async () => {
  const user = await getUser();
  const permission = await getAirlineStaffPermission(user!.email);
  const aNResult = await db
    .select({
      airlineName: airlineStaff.airlineName,
    })
    .from(airlineStaff)
    .where(eq(airlineStaff.email, user!.email));
  const airlineName = aNResult[0]!.airlineName;
  const flights = await db
    .select()
    .from(flight)
    .where(
      sql`${flight.departureTime} < NOW() + INTERVAL 1 MONTH AND ${flight.airlineName} = ${airlineName}`,
    )
    .orderBy(desc(flight.departureTime))
    .limit(32);

  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Flights Management [Permission Level: {permission}]
      </h2>
      <div className="flex flex-col gap-2">
        <h3 className="ml-4 scroll-m-20 text-xl font-semibold tracking-tight">
          Upcoming Flights In 30 days
        </h3>
        <FlightsTable data={flights} />
      </div>
      {permission >= 1 && <UpdateFlight />}
      {permission >= 2 && <CreateFlight />}
    </main>
  );
};

export default FlightsManagementPage;
