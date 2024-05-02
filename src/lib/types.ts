import { z } from "zod";

export const SignUpFormSchema = z.discriminatedUnion("userType", [
  z.object({
    email: z.string().email({ message: "Invalid email." }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(255),
    userType: z.literal("customer"),
    firstName: z.string().max(255),
    lastName: z.string().max(255),
    buildNum: z.string().max(255),
    street: z.string().max(255),
    city: z.string().max(255),
    state: z.string().max(255),
    phoneNum: z.string().max(255),
    passportNum: z.string().max(255),
    passportExp: z.string().max(255),
    passportCountry: z.string().max(255),
    dateOfBirth: z.string().max(255),
  }),
  z.object({
    email: z.string().email({ message: "Invalid email." }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(255),
    userType: z.literal("airline-staff"),
    airlineName: z.string().max(255),
    firstName: z.string().max(255),
    lastName: z.string().max(255),
    dateOfBirth: z.string().max(255),
    permission: z.coerce.number().min(0).max(2),
  }),
  z.object({
    email: z.string().email({ message: "Invalid email." }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(255),
    userType: z.literal("booking-agent"),
    airlineName: z.string().max(255),
  }),
  z.object({
    email: z.string().email({ message: "Invalid email." }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(255),
    userType: z.literal("none"),
  }),
]);

export const SignInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email." }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(255),
});

export const airportFormSchema = z.object({
  name: z.string().max(255),
  city: z.string().max(255),
});

export const airplaneFormSchema = z.object({
  seatsAmount: z.coerce.number(),
});

export const updateFlightFormSchema = z.object({
  flightNumber: z.coerce.number(),
  newStatus: z.enum([
    "upcoming",
    "in-progress",
    "delayed",
    "cancelled",
    "completed",
  ]),
});

export const createFlightFormSchema = z.object({
  departureAirport: z.string().max(255),
  departureTime: z.string().max(255),
  arrivalAirport: z.string().max(255),
  arrivalTime: z.string().max(255),
  price: z.string().max(255),
  airplaneIdNum: z.coerce.number(),
  status: z.enum([
    "upcoming",
    "in-progress",
    "delayed",
    "cancelled",
    "completed",
  ]),
});

export const searchFlightsFormSchema = z.object({
  departureAirport: z.string().max(255).optional(),
  arrivalAirport: z.string().max(255).optional(),
  departureDate: z.string().max(255).optional(),
});
