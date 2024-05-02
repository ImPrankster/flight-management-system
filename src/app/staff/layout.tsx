import { redirect } from "next/navigation";
import { checkUserType } from "~/server/auth/checkUserType";
import { getUser } from "~/server/auth/getUser";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  if (!(await checkUserType(user.email, ["airline-staff"]))) {
    redirect("/");
  }
  return <>{children}</>;
};

export default Layout;
