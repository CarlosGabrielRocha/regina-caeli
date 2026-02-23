"use server";
import { cookies } from "next/headers";


export default async function getTokensAction() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access")?.value;
  const refreshToken = cookieStore.get("refresh")?.value;
  
  return {
    accessToken,
    refreshToken
  }
}
