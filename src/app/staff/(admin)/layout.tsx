import { redirect } from "next/navigation";
import { getAirlineStaffPermission } from "~/server/auth/getAirlineStaffPermission";
import { getUser } from "~/server/auth/getUser";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  if ((await getAirlineStaffPermission(user.email)) < 2) {
    redirect("/");
  }
  return <>{children}</>;
};

export default Layout;
