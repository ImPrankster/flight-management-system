import FlightsTable from "~/components/flightsTable";
import { db } from "~/server/db";
import { flight } from "~/server/db/schema";

const FlightsPage = async () => {
  const data = await db.select().from(flight);

  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Flights
      </h2>
      <FlightsTable data={data} />
    </main>
  );
};

export default FlightsPage;
