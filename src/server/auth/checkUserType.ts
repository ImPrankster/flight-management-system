import { getUserType } from "./getUserType";

export const checkUserType = async (
  email: string,
  allowedType: Array<
    "customer" | "airline-staff" | "booking-agent" | "unspecified"
  >,
) => {
  return allowedType.includes(await getUserType(email));
};
