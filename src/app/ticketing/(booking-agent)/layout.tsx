import { redirect } from "next/navigation";
import { checkUserType } from "~/server/auth/checkUserType";
import { getUser } from "~/server/auth/getUser";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (!(await checkUserType(user!.email, ["booking-agent"]))) {
    redirect("/");
  }
  return <>{children}</>;
};

export default Layout;
