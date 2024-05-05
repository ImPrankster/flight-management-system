# Flight Management System

Project for CSCI-SHU 213

This is a Flight Management System that allows users to search for flights, book flights, and manage their bookings, and allow airline staff to manage the system.

## Technology used

- Next.js
- Tailwind CSS
- Drizzle ORM
- TypeScript
- MySQL

## File structure

- `./xxx`: Config files and scripts.
- `drizzle/`: Drizzle migration files.
- `src/app/`: Next.js pages `page.tsx` to render the page and `layout.tsx` to render the layout, `error.tsx` to render error pages.
  - `src/components/`: React components.
  - `src/lib/`: TypeScript files for data validation and other utility functions.
  - `src/server/`: Server-side code.
    - `src/server/auth/`: Authentication and authorization logic.
    - `src/server/db/`: Database schema and migrations.
      - `src/server/db/schema.ts`: Database schema.
  - `src/styles/`: CSS files.

## Functionalities and related queries

Sign up

```typescript
try {
  await db.insert(userTable).values({
    id: userId,
    email: fd.email,
    hashedPassword: hashedPassword,
  });
} catch (e) {
  throw new Error("User already exists");
}

if (fd.userType == "customer") {
  try {
    await db.insert(customer).values({
      email: fd.email,
      firstName: fd.firstName,
      lastName: fd.lastName,
      buildingNumber: fd.buildNum,
      city: fd.city,
      state: fd.state,
      dateOfBirth: fd.dateOfBirth,
      passportNumber: fd.passportNum,
      passportExpiration: fd.passportExp,
      passportCountry: fd.passportCountry,
      phoneNumber: fd.phoneNum,
      street: fd.street,
    });
  } catch (e) {
    await db.delete(userTable).where(eq(userTable.email, fd.email));
    throw new Error("Invalid customer data");
  }
}

if (fd.userType === "airline-staff") {
  try {
    await db.insert(airlineStaff).values({
      email: fd.email,
      firstName: fd.firstName,
      lastName: fd.lastName,
      dateOfBirth: fd.dateOfBirth,
      airlineName: fd.airlineName,
      permission: fd.permission,
    });
  } catch (e) {
    await db.delete(userTable).where(eq(userTable.email, fd.email));
    throw new Error("Invalid airline staff data");
  }
}

if (fd.userType === "booking-agent") {
  try {
    await db.insert(bookingAgent).values({
      email: fd.email,
      airlineName: fd.airlineName,
    });
  } catch (e) {
    await db.delete(userTable).where(eq(userTable.email, fd.email));
    throw new Error("Invalid booking agent data");
  }
}
```

Sign in

```typescript
const existingUser = (
  await db.selectDistinct().from(userTable).where(eq(userTable.email, email))
)[0]!;

if (!existingUser) {
  throw new Error("User does not exist");
}

const validPassword = await new (
  await import("oslo/password")
).Argon2id().verify(existingUser.hashedPassword, password);
if (!validPassword) {
  throw new Error("Incorrect password");
}
```

Search flights

```typescript
const result = await db
  .select()
  .from(flight)
  .where(
    and(
      sql.raw(
        `${param.arrivalAirport ? `arrival_airport = '${param.arrivalAirport}'` : "TRUE"} AND ${param.departureAirport ? `departure_airport = '${param.departureAirport}'` : "TRUE"} AND ${param.departureDate ? `DATE(departure_time) = '${param.departureDate}'` : "TRUE"}`,
      ),
      sql`Date(${flight.departureTime}) > CURDATE()`,
    ),
  );
```

Purchase flight

```typescript
try {
  const isFull =
    (
      await db
        .select({ count: count() })
        .from(ticket)
        .where(eq(ticket.flightNumber, param.flightNumber))
    )[0]!.count >=
    (
      await db
        .select({ airplaneCapacity: airplane.seatsAmount })
        .from(airplane)
        .leftJoin(flight, eq(flight.airplaneIdNum, airplane.idNum))
        .where(eq(flight.flightNumber, param.flightNumber))
    )[0]!.airplaneCapacity;
  if (isFull) {
    return new Response("Flight is full", { status: 400 });
  }
} catch (e) {
  return new Response("Failed to purchase", { status: 400 });
}

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
```

Adding airplane

```typescript
try {
  await db.insert(airplane).values({ seatsAmount, airlineName });
} catch (e) {
  throw new Error("Failed to add airplane");
}
```

Update flight

```typescript
try {
  await db
    .update(flight)
    .set({ status: fd.newStatus })
    .where(eq(flight.flightNumber, fd.flightNumber));
} catch (e) {
  throw new Error("Failed to update flight.");
}
```

Retrieving system report

```typescript
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
```

Retrieving user's upcoming flights

```typescript
const data = await db
  .select(flight)
  .from(flight)
  .rightJoin(ticket, eq(flight.flightNumber, ticket.flightNumber))
  .where(
    and(
      eq(ticket.customerEmail, user!.email),
      sql`Date(${flight.departureTime}) > CURDATE()`,
    ),
  );
```

Retrieving user spending statistics

```typescript
const result = await db
  .select({
    month: sql<string>`MONTH(${flight.departureTime})`,
    year: sql<string>`YEAR(${flight.departureTime})`,
    sum: sum(flight.price),
  })
  .from(ticket)
  .leftJoin(flight, eq(ticket.flightNumber, flight.flightNumber))
  .where(
    and(
      or(
        eq(ticket.customerEmail, user!.email),
        eq(ticket.bookingAgentId, bookingAgentId ?? -1),
      ),
      sql.raw(
        `DATE(Flight.departure_time) BETWEEN DATE('${param.startDate.toISOString().split("T")[0]}') AND DATE('${param.endDate.toISOString().split("T")[0]}')`,
      ),
    ),
  )
  .groupBy(
    sql`MONTH(${flight.departureTime})`,
    sql`YEAR(${flight.departureTime})`,
  );
```
