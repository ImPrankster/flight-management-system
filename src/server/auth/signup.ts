"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { lucia } from "~/server/auth";
import { userTable } from "~/server/db/schema";
import { generateId } from "lucia";
import { SignUpFormSchema } from "~/lib/types";

export async function signup(formData: FormData): Promise<ActionResult> {
  const { email, password } = SignUpFormSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const hashedPassword = await new (
    await import("oslo/password")
  ).Argon2id().hash(password);

  const userId = generateId(15);

  try {
    await db.insert(userTable).values({
      id: userId,
      email: email,
      hashedPassword: hashedPassword,
    });
  } catch (e) {
    throw new Error("User already exists");
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

interface ActionResult {
  error: string;
}
