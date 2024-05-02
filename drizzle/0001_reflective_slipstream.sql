ALTER TABLE `AirlineStaff` RENAME COLUMN `permissions` TO `permission`;--> statement-breakpoint
ALTER TABLE `Customer` RENAME COLUMN `name` TO `firstName`;--> statement-breakpoint
ALTER TABLE `AirlineStaff` MODIFY COLUMN `airline_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `AirlineStaff` MODIFY COLUMN `permission` int NOT NULL;--> statement-breakpoint
ALTER TABLE `Airplane` MODIFY COLUMN `seats_amount` int NOT NULL;--> statement-breakpoint
ALTER TABLE `Airport` MODIFY COLUMN `city` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `BookingAgent` MODIFY COLUMN `airline_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `Customer` MODIFY COLUMN `building_number` varchar(255);--> statement-breakpoint
ALTER TABLE `Flight` MODIFY COLUMN `airline_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `Flight` MODIFY COLUMN `departure_airport` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `Flight` MODIFY COLUMN `arrival_airport` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `Flight` MODIFY COLUMN `arrival_time` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `Flight` MODIFY COLUMN `price` decimal(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `Flight` MODIFY COLUMN `airplane_id_num` int NOT NULL;--> statement-breakpoint
ALTER TABLE `Flight` MODIFY COLUMN `status` enum('upcoming','in-progress','delayed','cancelled','completed') NOT NULL;--> statement-breakpoint
ALTER TABLE `Ticket` MODIFY COLUMN `customer_email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `Ticket` MODIFY COLUMN `flight_number` int NOT NULL;--> statement-breakpoint
ALTER TABLE `Customer` ADD `lastName` varchar(255);