import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getUser } from "~/server/auth/getUser";
import { getUserType } from "~/server/auth/getUserType";
import { signout } from "~/server/auth/signout";

export default async function HomePage() {
  const user = await getUser();
  const userType = user ? await getUserType(user.email) : null;

  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Flight Management System
        </h1>
        {user && userType ? (
          <>
            <span className="text-xl text-muted-foreground">
              Welcome back, {userType} {user.email}
            </span>

            {
              {
                customer: (
                  <div className="flex gap-2">
                    <Button variant={"ghost"} asChild className="text-lg">
                      <Link href="/ticketing/search">
                        Flight Search <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                    <Button variant={"ghost"} asChild className="text-lg">
                      <Link href="/ticketing/my-flights">
                        Check My Flights <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                    <Button variant={"ghost"} asChild className="text-lg">
                      <Link href="/ticketing/spending">
                        Check My Spending <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                ),
                "airline-staff": (
                  <div className="flex max-w-3xl flex-wrap place-content-center gap-2">
                    <Button variant={"ghost"} asChild className="text-lg">
                      <Link href="/staff/edit-flights">
                        Flight Search <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                    <Button variant={"ghost"} asChild className="text-lg">
                      <Link href="/staff/my-flights">
                        Check My Flights <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                    <Button variant={"ghost"} asChild className="text-lg">
                      <Link href="/staff/role-management">
                        Manage Roles <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                    <Button variant={"ghost"} asChild className="text-lg">
                      <Link href="/staff/airport-management">
                        Manage Airports <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                    <Button variant={"ghost"} asChild className="text-lg">
                      <Link href="/staff/system-report">
                        View System Report <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                    <Button variant={"ghost"} asChild className="text-lg">
                      <Link href="/staff/my-earning">
                        View My Earning
                        <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                ),
                "booking-agent": (
                  <div className="flex gap-2">
                    <Button variant={"ghost"} asChild className="text-lg">
                      <Link href="/ticketing/search">
                        Flight Search <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                    <Button variant={"ghost"} asChild className="text-lg">
                      <Link href="/ticketing/my-flights">
                        Check My Flights <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                    <Button variant={"ghost"} asChild className="text-lg">
                      <Link href="/ticketing/statistics">
                        Check My Stats <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                ),
                unspecified: null,
              }[userType]
            }

            <form action={signout}>
              <Button variant={"destructive"} className="rounded-full">
                Sign out
              </Button>
            </form>
          </>
        ) : (
          <>
            <div className="flex gap-2">
              <Button variant={"ghost"} asChild className="text-lg">
                <Link href="/flights">
                  Flight Search <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
            <div className="space-x-4">
              <Button variant={"secondary"} className="rounded-full" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button variant={"default"} className="rounded-full">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
