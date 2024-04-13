CREATE TABLE `Airline` (
	`name` varchar(255) NOT NULL,
	CONSTRAINT `Airline_name` PRIMARY KEY(`name`)
);
--> statement-breakpoint
CREATE TABLE `AirlineStaff` (
	`email` varchar(255) NOT NULL,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`date_of_birth` datetime,
	`airline_name` varchar(255),
	`permissions` varchar(255),
	CONSTRAINT `AirlineStaff_email` PRIMARY KEY(`email`)
);
--> statement-breakpoint
CREATE TABLE `Airplane` (
	`id_num` int NOT NULL,
	`airline_name` varchar(255),
	`seats_amount` int,
	CONSTRAINT `Airplane_id_num` PRIMARY KEY(`id_num`)
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
	`booking_agent_id` int AUTO_INCREMENT,
	CONSTRAINT `BookingAgent_email` PRIMARY KEY(`email`),
	CONSTRAINT `BookingAgent_booking_agent_id_unique` UNIQUE(`booking_agent_id`)
);
--> statement-breakpoint
CREATE TABLE `Customer` (
	`email` varchar(255) NOT NULL,
	`name` varchar(255),
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
	`airplane_id_num` int,
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
	`id` varchar(255) NOT NULL,
	`user_id` int NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `Session_id` PRIMARY KEY(`id`)
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
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255),
	`hashed_password` varchar(255) NOT NULL,
	CONSTRAINT `User_id` PRIMARY KEY(`id`),
	CONSTRAINT `User_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `AirlineStaff` ADD CONSTRAINT `AirlineStaff_email_User_email_fk` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `AirlineStaff` ADD CONSTRAINT `AirlineStaff_airline_name_Airline_name_fk` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Airplane` ADD CONSTRAINT `Airplane_airline_name_Airline_name_fk` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `BookingAgent` ADD CONSTRAINT `BookingAgent_email_User_email_fk` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_email_User_email_fk` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_airline_name_Airline_name_fk` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_departure_airport_Airport_name_fk` FOREIGN KEY (`departure_airport`) REFERENCES `Airport`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_arrival_airport_Airport_name_fk` FOREIGN KEY (`arrival_airport`) REFERENCES `Airport`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_airplane_id_num_Airplane_id_num_fk` FOREIGN KEY (`airplane_id_num`) REFERENCES `Airplane`(`id_num`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `FlightPassenger` ADD CONSTRAINT `FlightPassenger_flight_number_Flight_flight_number_fk` FOREIGN KEY (`flight_number`) REFERENCES `Flight`(`flight_number`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `FlightPassenger` ADD CONSTRAINT `FlightPassenger_airline_name_Airline_name_fk` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `FlightPassenger` ADD CONSTRAINT `FlightPassenger_customer_email_Customer_email_fk` FOREIGN KEY (`customer_email`) REFERENCES `Customer`(`email`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Session` ADD CONSTRAINT `Session_user_id_User_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_customer_email_Customer_email_fk` FOREIGN KEY (`customer_email`) REFERENCES `Customer`(`email`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_airline_name_Airline_name_fk` FOREIGN KEY (`airline_name`) REFERENCES `Airline`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_flight_number_Flight_flight_number_fk` FOREIGN KEY (`flight_number`) REFERENCES `Flight`(`flight_number`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_booking_agent_id_BookingAgent_booking_agent_id_fk` FOREIGN KEY (`booking_agent_id`) REFERENCES `BookingAgent`(`booking_agent_id`) ON DELETE no action ON UPDATE no action;