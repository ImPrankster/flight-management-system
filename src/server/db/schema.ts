import { sql } from "drizzle-orm";
import {
  mysqlTable,
  varchar,
  int,
  datetime,
  decimal,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const userTable = mysqlTable("User", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .default(sql`(UUID())`),
  email: varchar("email", {
    length: 255,
  })
    .unique()
    .notNull(),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }).notNull(),
});

export const sessionTable = mysqlTable("Session", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userTable.id),
  expiresAt: datetime("expires_at").notNull(),
});

export const airline = mysqlTable("Airline", {
  name: varchar("name", { length: 255 }).primaryKey(),
});

export const airlineStaff = mysqlTable("AirlineStaff", {
  email: varchar("email", { length: 255 })
    .references(() => userTable.email)
    .primaryKey(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  dateOfBirth: datetime("date_of_birth", { mode: "string" }),
  airlineName: varchar("airline_name", { length: 255 })
    .references(() => airline.name)
    .notNull(),
  permission: int("permission").notNull(),
});

export const airplane = mysqlTable("Airplane", {
  idNum: int("id_num").primaryKey().autoincrement(),
  airlineName: varchar("airline_name", { length: 255 }).references(
    () => airline.name,
  ),
  seatsAmount: int("seats_amount").notNull(),
});

export const airport = mysqlTable("Airport", {
  name: varchar("name", { length: 255 }).primaryKey(),
  city: varchar("city", { length: 255 }).notNull(),
});

export const bookingAgent = mysqlTable("BookingAgent", {
  email: varchar("email", { length: 255 })
    .references(() => userTable.email)
    .primaryKey(),
  airlineName: varchar("airline_name", { length: 255 })
    .references(() => airline.name)
    .notNull(),
  bookingAgentId: int("booking_agent_id").unique().autoincrement().notNull(),
});

export const customer = mysqlTable("Customer", {
  email: varchar("email", { length: 255 })
    .references(() => userTable.email)
    .primaryKey(),
  firstName: varchar("firstName", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }),
  buildingNumber: varchar("building_number", { length: 255 }),
  street: varchar("street", { length: 255 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
  phoneNumber: varchar("phone_number", { length: 255 }),
  passportNumber: varchar("passport_number", { length: 255 }),
  passportExpiration: datetime("passport_expiration", { mode: "string" }),
  passportCountry: varchar("passport_country", { length: 255 }),
  dateOfBirth: datetime("date_of_birth", { mode: "string" }),
});

export const flight = mysqlTable("Flight", {
  flightNumber: int("flight_number").primaryKey().autoincrement(),
  airlineName: varchar("airline_name", { length: 255 })
    .references(() => airline.name)
    .notNull(),
  departureAirport: varchar("departure_airport", { length: 255 })
    .references(() => airport.name)
    .notNull(),
  departureTime: datetime("departure_time", { mode: "string" }),
  arrivalAirport: varchar("arrival_airport", { length: 255 })
    .references(() => airport.name)
    .notNull(),
  arrivalTime: datetime("arrival_time", { mode: "string" }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  airplaneIdNum: int("airplane_id_num")
    .references(() => airplane.idNum)
    .notNull(),
  status: mysqlEnum("status", [
    "upcoming",
    "in-progress",
    "delayed",
    "cancelled",
    "completed",
  ]).notNull(),
});

export const ticket = mysqlTable("Ticket", {
  ticketId: int("ticket_id").primaryKey().autoincrement(),
  customerEmail: varchar("customer_email", { length: 255 })
    .references(() => customer.email)
    .notNull(),
  flightNumber: int("flight_number")
    .references(() => flight.flightNumber)
    .notNull(),
  bookingAgentId: int("booking_agent_id").references(
    () => bookingAgent.bookingAgentId,
  ),
});
