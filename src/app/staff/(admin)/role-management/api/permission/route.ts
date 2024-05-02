import { getAirlineStaffPermission } from "~/server/auth/getAirlineStaffPermission";
import { getUser } from "~/server/auth/getUser";

export async function POST(req: Request) {
  const user = await getUser();
  if ((await getAirlineStaffPermission(user!.email)) !== 2) {
    return new Response("Unauthorized", { status: 401 });
  }
}
