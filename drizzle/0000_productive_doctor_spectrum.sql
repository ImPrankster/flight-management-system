-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `Account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `Airline` (
	`name` varchar(255) NOT NULL,
	CONSTRAINT `Airline_name` PRIMARY KEY(`name`)
);
--> statement-breakpoint
CREATE TABLE `AirlineStaff` (
	`username` varchar(255) NOT NULL,
	`password` varchar(255),
	`first_name` varchar(255),
	`last_name` varchar(255),
	`date_of_birth` datetime,
	`airline_name` varchar(255),
	`permissions` varchar(255),
	CONSTRAINT `AirlineStaff_username` PRIMARY KEY(`username`)
);
--> statement-breakpoint
CREATE TABLE `Airplane` (
	`identification_number` int NOT NULL,
	`airline_name` varchar(255),
	`seats_amount` int,
	CONSTRAINT `Airplane_identification_number` PRIMARY KEY(`identification_number`)
);
--> statement-breakpoint
CREATE TABLE `Airport` (
	`name` varchar(255) NOT NULL,
	`city` varchar(255),
	CONSTRAINT `Airport_name` PRIMARY KEY(`name`)
);
--> statement-breakpoint
CREATE TABLE `BookingAgent` (
	`email` varchar(255) NOT NULL,
	`password` varchar(255),
	`booking_agent_id` int,
	CONSTRAINT `BookingAgent_email` PRIMARY KEY(`email`),
	CONSTRAINT `booking_agent_id` UNIQUE(`booking_agent_id`)
);
--> statement-breakpoint
CREATE TABLE `Customer` (
	`email` varchar(255) NOT NULL,
	`name` varchar(255),
	`password` varchar(255),
	`building_number` int,
	`street` varchar(255),
	`city` varchar(255),
	`state` varchar(255),
	`phone_number` varchar(255),
	`passport_number` varchar(255),
	`passport_expiration` datetime,
	`passport_country` varchar(255),
	`date_of_birth` datetime,
	CONSTRAINT `Customer_email` PRIMARY KEY(`email`)
);
--> statement-breakpoint
CREATE TABLE `Flight` (
	`flight_number` int NOT NULL,
	`airline_name` varchar(255),
	`departure_airport` varchar(255),
	`departure_time` datetime,
	`arrival_airport` varchar(255),
	`arrival_time` datetime,
	`price` decimal(10,2),
	`airplane_identification_number` int,
	`status` varchar(255),
	CONSTRAINT `Flight_flight_number` PRIMARY KEY(`flight_number`)
);
--> statement-breakpoint
CREATE TABLE `FlightPassenger` (
	`flight_number` int,
	`airline_name` varchar(255),
	`customer_email` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `Session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `Session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `Ticket` (
	`ticket_id` int NOT NULL,
	`customer_email` varchar(255),
	`airline_name` varchar(255),
	`flight_number` int,
	`booking_agent_id` int,
	CONSTRAINT `Ticket_ticket_id` PRIMARY KEY(`ticket_id`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `User_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `VerificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `VerificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `Account` (`userId`);--> statement-breakpoint
CREATE INDEX `airline_name` ON `AirlineStaff` (`airline_name`);--> statement-breakpoint
CREATE INDEX `airline_name` ON `Airplane` (`airline_name`);--> statement-breakpoint
CREATE INDEX `airline_name` ON `Flight` (`airline_name`);--> statement-breakpoint
CREATE INDEX `departure_airport` ON `Flight` (`departure_airport`);--> statement-breakpoint
CREATE INDEX `arrival_airport` ON `Flight` (`arrival_airport`);--> statement-breakpoint
CREATE INDEX `airplane_identification_number` ON `Flight` (`airplane_identification_number`);--> statement-breakpoint
CREATE INDEX `flight_number` ON `FlightPassenger` (`flight_number`);--> statement-breakpoint
CREATE INDEX `airline_name` ON `FlightPassenger` (`airline_name`);--> statement-breakpoint
CREATE INDEX `customer_email` ON `FlightPassenger` (`customer_email`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `Session` (`userId`);--> statement-breakpoint
CREATE INDEX `customer_email` ON `Ticket` (`customer_email`);--> statement-breakpoint
CREATE INDEX `airline_name` ON `Ticket` (`airline_name`);--> statement-breakpoint
CREATE INDEX `flight_number` ON `Ticket` (`flight_number`);--> statement-breakpoint
CREATE INDEX `booking_agent_id` ON `Ticket` (`booking_agent_id`);--> statement-breakpoint
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `AirlineStaff` ADD CONSTRAINT `AirlineStaff_ibfk_1` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Airplane` ADD CONSTRAINT `Airplane_ibfk_1` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_ibfk_1` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_ibfk_2` FOREIGN KEY (`departure_airport`) REFERENCES `Airport`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_ibfk_3` FOREIGN KEY (`arrival_airport`) REFERENCES `Airport`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_ibfk_4` FOREIGN KEY (`airplane_identification_number`) REFERENCES `Airplane`(`identification_number`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `FlightPassenger` ADD CONSTRAINT `FlightPassenger_ibfk_1` FOREIGN KEY (`flight_number`) REFERENCES `Flight`(`flight_number`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `FlightPassenger` ADD CONSTRAINT `FlightPassenger_ibfk_2` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `FlightPassenger` ADD CONSTRAINT `FlightPassenger_ibfk_3` FOREIGN KEY (`customer_email`) REFERENCES `Customer`(`email`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_ibfk_1` FOREIGN KEY (`customer_email`) REFERENCES `Customer`(`email`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_ibfk_2` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_ibfk_3` FOREIGN KEY (`flight_number`) REFERENCES `Flight`(`flight_number`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_ibfk_4` FOREIGN KEY (`booking_agent_id`) REFERENCES `BookingAgent`(`booking_agent_id`) ON DELETE no action ON UPDATE no action;
*/