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
    passportExp: z.string(),
    passportCountry: z.string().max(255),
    dateOfBirth: z.string(),
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
    dateOfBirth: z.string(),
    permissions: z.enum(["admin", "operator", "none", "adminOperator"]),
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
  city: z.string().max(255).optional(),
});
