"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { lucia } from "~/server/auth";
import {
  airlineStaff,
  bookingAgent,
  customer,
  userTable,
} from "~/server/db/schema";
import { generateId } from "lucia";
import { SignUpFormSchema } from "~/lib/types";
import { eq } from "drizzle-orm";

export async function signup(formData: FormData) {
  const fd = SignUpFormSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
    userType: formData.get("userType"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    buildNum: formData.get("buildNum"),
    street: formData.get("street"),
    city: formData.get("city"),
    state: formData.get("state"),
    phoneNum: formData.get("phoneNum"),
    passportNum: formData.get("passportNum"),
    passportExp: formData.get("passportExp"),
    passportCountry: formData.get("passportCountry"),
    dateOfBirth: formData.get("dateOfBirth"),
    airlineName: formData.get("airlineName"),
    permission: formData.get("permission"),
  });

  const hashedPassword = await new (
    await import("oslo/password")
  ).Argon2id().hash(fd.password);

  const userId = generateId(15);

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

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
