import { getAirlineStaffPermission } from "~/server/auth/getAirlineStaffPermission";
import { getUser } from "~/server/auth/getUser";
import { db } from "~/server/db";
import { flight } from "~/server/db/schema";
import FlightsTable from "../../../components/flightsTable";
import UpdateFlight from "./updateFlight";

const FlightsManagementPage = async () => {
  const user = await getUser();
  const permission = await getAirlineStaffPermission(user!.email);
  const flights = await db.select().from(flight).limit(255);

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
    </main>
  );
};

export default FlightsManagementPage;
