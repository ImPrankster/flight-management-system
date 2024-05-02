import { getUser } from "~/server/auth/getUser";
import SalesReport from "./salesReport";
import { db } from "~/server/db";
import {
  airlineStaff,
  airport,
  bookingAgent,
  customer,
  flight,
  ticket,
} from "~/server/db/schema";
import { desc, eq, count, sql } from "drizzle-orm";
import dynamic from "next/dynamic";

const InfoChart = dynamic(() => import("./infoChart"), {
  ssr: false,
});

const StatsChart = dynamic(() => import("./statsChart"), {
  ssr: false,
});

const SystemReportPage = async () => {
  const user = await getUser();
  const airlineName = (
    await db
      .select({ name: airlineStaff.airlineName })
      .from(airlineStaff)
      .where(eq(airlineStaff.email, user!.email))
  )[0]!.name;

  const topCustomer = await db
    .select({
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      count: count(ticket.ticketId),
    })
    .from(ticket)
    .leftJoin(flight, eq(ticket.flightNumber, flight.flightNumber))
    .leftJoin(customer, eq(ticket.customerEmail, customer.email))
    .where(eq(flight.airlineName, airlineName))
    .groupBy(ticket.customerEmail)
    .orderBy(desc(count(ticket.ticketId)))
    .limit(5);

  const topDestination = await db
    .select({
      key: airport.city,
      count: count(ticket.ticketId),
    })
    .from(ticket)
    .leftJoin(flight, eq(ticket.flightNumber, flight.flightNumber))
    .leftJoin(airport, eq(flight.arrivalAirport, airport.name))
    .where(eq(flight.airlineName, airlineName))
    .groupBy(airport.city)
    .orderBy(desc(count(ticket.ticketId)))
    .limit(5);

  const topBookingAgent = await db
    .select({
      key: bookingAgent.email,
      count: count(ticket.ticketId),
    })
    .from(ticket)
    .leftJoin(flight, eq(ticket.flightNumber, flight.flightNumber))
    .rightJoin(
      bookingAgent,
      eq(ticket.bookingAgentId, bookingAgent.bookingAgentId),
    )
    .where(eq(flight.airlineName, airlineName))
    .groupBy(bookingAgent.email)
    .orderBy(desc(count(ticket.ticketId)))
    .limit(5);

  const selfPurchased = await db
    .select({
      count: count(ticket.ticketId),
    })
    .from(ticket)
    .where(sql`${ticket.bookingAgentId} IS NULL`);
  const bookingAgentPurchased = await db
    .select({
      count: count(ticket.ticketId),
    })
    .from(ticket)
    .where(sql`${ticket.bookingAgentId} IS NOT NULL`);

  return (
    <main className="grid grid-cols-1 place-items-stretch gap-4 p-4 md:grid-cols-2">
      <SalesReport />
      <div>
        <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Top Customers
        </h2>
        <InfoChart
          data={topCustomer.map(({ email, firstName, lastName, count }) => ({
            key: `${firstName} ${lastName} (${email})`,
            count,
          }))}
          color="#DB4D6D"
        />
      </div>
      <div>
        <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Top Destinations
        </h2>
        <InfoChart data={topDestination} color="#0e7490" />
      </div>
      <div>
        <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Top Booking Agents
        </h2>
        <InfoChart data={topBookingAgent} color="#9a3412" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Self Purchased / Booking Agent Purchased
        </h2>
        <StatsChart
          data={[
            { key: "Self Purchased", sum: selfPurchased[0]?.count },
            {
              key: "Booking Agent Purchased",
              sum: bookingAgentPurchased[0]?.count,
            },
          ]}
        />
      </div>
    </main>
  );
};

export default SystemReportPage;
