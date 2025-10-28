import { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  console.log(`Middleware Executado ${req}`)
}