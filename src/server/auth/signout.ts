"use server";

import { cookies } from "next/headers";
import { lucia } from ".";
import { validateRequest } from "./getUser";
import { redirect } from "next/navigation";

export async function signout() {
  const { session } = await validateRequest();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
