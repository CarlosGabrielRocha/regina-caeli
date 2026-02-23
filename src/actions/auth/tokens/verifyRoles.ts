import { UserRole } from "../../types/Modals";
import { DecodedAccess } from "../../../proxy";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export default async function verifyRoles(
  accessToken: string,
  necessaryRoles?: UserRole[],
) {
  const decodedAccess = jwt.decode(accessToken) as DecodedAccess;
  const hasRoles = necessaryRoles?.every((role) =>
    decodedAccess?.roles.includes(role),
  );
  if (necessaryRoles && !hasRoles) {
    redirect("/unauthorized");
  }
}
