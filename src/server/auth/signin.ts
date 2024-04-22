"use server";

import { cookies } from "next/headers";
import { lucia } from ".";
import { redirect } from "next/navigation";
import { db } from "../db";
import { SignInFormSchema } from "~/lib/types";
import { userTable } from "../db/schema";
import { eq } from "drizzle-orm";

export async function signin(formData: FormData) {
  const { email, password } = SignInFormSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

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

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
