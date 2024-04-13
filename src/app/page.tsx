import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { lucia } from "~/server/auth";
import { getUser, validateRequest } from "~/server/auth/getUser";

export default async function HomePage() {
  const user = await getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Airport Ticketing System
        </h1>
        {user ? (
          <>
            <span className="text-xl text-muted-foreground">
              Welcome back, {user?.email}
            </span>
            <form action={logout}>
              <Button variant={"destructive"} className="rounded-full">
                Sign out
              </Button>
            </form>
          </>
        ) : (
          <div className="space-x-4">
            <Button variant={"secondary"} className="rounded-full" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button variant={"default"} className="rounded-full">
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

async function logout() {
  "use server";
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
