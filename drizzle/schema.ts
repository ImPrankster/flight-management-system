import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, varchar, text, int, datetime, unique, decimal, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const account = mysqlTable("Account", {
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id),
	type: varchar("type", { length: 255 }).notNull(),
	provider: varchar("provider", { length: 255 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: int("expires_at"),
	tokenType: varchar("token_type", { length: 255 }),
	scope: varchar("scope", { length: 255 }),
	idToken: text("id_token"),
	sessionState: varchar("session_state", { length: 255 }),
},
(table) => {
	return {
		accountUserIdIdx: index("account_userId_idx").on(table.userId),
		accountProviderProviderAccountId: primaryKey({ columns: [table.provider, table.providerAccountId], name: "Account_provider_providerAccountId"}),
	}
});

export const airline = mysqlTable("Airline", {
	name: varchar("name", { length: 255 }).notNull(),
},
(table) => {
	return {
		airlineName: primaryKey({ columns: [table.name], name: "Airline_name"}),
	}
});

export const airlineStaff = mysqlTable("AirlineStaff", {
	username: varchar("username", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }),
	firstName: varchar("first_name", { length: 255 }),
	lastName: varchar("last_name", { length: 255 }),
	dateOfBirth: datetime("date_of_birth", { mode: 'string'}),
	airlineName: varchar("airline_name", { length: 255 }).references(() => airline.name),
	permissions: varchar("permissions", { length: 255 }),
},
(table) => {
	return {
		airlineName: index("airline_name").on(table.airlineName),
		airlineStaffUsername: primaryKey({ columns: [table.username], name: "AirlineStaff_username"}),
	}
});

export const airplane = mysqlTable("Airplane", {
	identificationNumber: int("identification_number").notNull(),
	airlineName: varchar("airline_name", { length: 255 }).references(() => airline.name),
	seatsAmount: int("seats_amount"),
},
(table) => {
	return {
		airlineName: index("airline_name").on(table.airlineName),
		airplaneIdentificationNumber: primaryKey({ columns: [table.identificationNumber], name: "Airplane_identification_number"}),
	}
});

export const airport = mysqlTable("Airport", {
	name: varchar("name", { length: 255 }).notNull(),
	city: varchar("city", { length: 255 }),
},
(table) => {
	return {
		airportName: primaryKey({ columns: [table.name], name: "Airport_name"}),
	}
});

export const bookingAgent = mysqlTable("BookingAgent", {
	email: varchar("email", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }),
	bookingAgentId: int("booking_agent_id"),
},
(table) => {
	return {
		bookingAgentEmail: primaryKey({ columns: [table.email], name: "BookingAgent_email"}),
		bookingAgentId: unique("booking_agent_id").on(table.bookingAgentId),
	}
});

export const customer = mysqlTable("Customer", {
	email: varchar("email", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }),
	password: varchar("password", { length: 255 }),
	buildingNumber: int("building_number"),
	street: varchar("street", { length: 255 }),
	city: varchar("city", { length: 255 }),
	state: varchar("state", { length: 255 }),
	phoneNumber: varchar("phone_number", { length: 255 }),
	passportNumber: varchar("passport_number", { length: 255 }),
	passportExpiration: datetime("passport_expiration", { mode: 'string'}),
	passportCountry: varchar("passport_country", { length: 255 }),
	dateOfBirth: datetime("date_of_birth", { mode: 'string'}),
},
(table) => {
	return {
		customerEmail: primaryKey({ columns: [table.email], name: "Customer_email"}),
	}
});

export const flight = mysqlTable("Flight", {
	flightNumber: int("flight_number").notNull(),
	airlineName: varchar("airline_name", { length: 255 }).references(() => airline.name),
	departureAirport: varchar("departure_airport", { length: 255 }).references(() => airport.name),
	departureTime: datetime("departure_time", { mode: 'string'}),
	arrivalAirport: varchar("arrival_airport", { length: 255 }).references(() => airport.name),
	arrivalTime: datetime("arrival_time", { mode: 'string'}),
	price: decimal("price", { precision: 10, scale: 2 }),
	airplaneIdentificationNumber: int("airplane_identification_number").references(() => airplane.identificationNumber),
	status: varchar("status", { length: 255 }),
},
(table) => {
	return {
		airlineName: index("airline_name").on(table.airlineName),
		departureAirport: index("departure_airport").on(table.departureAirport),
		arrivalAirport: index("arrival_airport").on(table.arrivalAirport),
		airplaneIdentificationNumber: index("airplane_identification_number").on(table.airplaneIdentificationNumber),
		flightFlightNumber: primaryKey({ columns: [table.flightNumber], name: "Flight_flight_number"}),
	}
});

export const flightPassenger = mysqlTable("FlightPassenger", {
	flightNumber: int("flight_number").references(() => flight.flightNumber),
	airlineName: varchar("airline_name", { length: 255 }).references(() => airline.name),
	customerEmail: varchar("customer_email", { length: 255 }).references(() => customer.email),
},
(table) => {
	return {
		flightNumber: index("flight_number").on(table.flightNumber),
		airlineName: index("airline_name").on(table.airlineName),
		customerEmail: index("customer_email").on(table.customerEmail),
	}
});

export const session = mysqlTable("Session", {
	sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionUserIdIdx: index("session_userId_idx").on(table.userId),
		sessionSessionToken: primaryKey({ columns: [table.sessionToken], name: "Session_sessionToken"}),
	}
});

export const ticket = mysqlTable("Ticket", {
	ticketId: int("ticket_id").notNull(),
	customerEmail: varchar("customer_email", { length: 255 }).references(() => customer.email),
	airlineName: varchar("airline_name", { length: 255 }).references(() => airline.name),
	flightNumber: int("flight_number").references(() => flight.flightNumber),
	bookingAgentId: int("booking_agent_id").references(() => bookingAgent.bookingAgentId),
},
(table) => {
	return {
		customerEmail: index("customer_email").on(table.customerEmail),
		airlineName: index("airline_name").on(table.airlineName),
		flightNumber: index("flight_number").on(table.flightNumber),
		bookingAgentId: index("booking_agent_id").on(table.bookingAgentId),
		ticketTicketId: primaryKey({ columns: [table.ticketId], name: "Ticket_ticket_id"}),
	}
});

export const user = mysqlTable("User", {
	id: varchar("id", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", { fsp: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP(3)`),
	image: varchar("image", { length: 255 }),
},
(table) => {
	return {
		userId: primaryKey({ columns: [table.id], name: "User_id"}),
	}
});

export const verificationToken = mysqlTable("VerificationToken", {
	identifier: varchar("identifier", { length: 255 }).notNull(),
	token: varchar("token", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationTokenIdentifierToken: primaryKey({ columns: [table.identifier, table.token], name: "VerificationToken_identifier_token"}),
	}
});