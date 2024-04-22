import { signout } from "~/server/auth/signout";
import { Button } from "./ui/button";
import Link from "next/link";
import { getUser } from "~/server/auth/getUser";

const NavBar = async () => {
  const user = await getUser();
  return (
    <nav className="fixed top-0 z-50 flex h-16 w-screen place-items-center gap-2 border-b border-border bg-background px-2">
      <Button
        variant={"ghost"}
        className="rounded-full font-bold tracking-tight"
        asChild
      >
        <Link href={"/"}>Flight Management System</Link>
      </Button>
      <div className="flex-1" />
      {user ? (
        <>
          <form action={signout}>
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
    </nav>
  );
};

export default NavBar;
