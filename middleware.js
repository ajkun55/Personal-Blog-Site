import { NextResponse } from "next/server";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

export function middleware(request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (token === ADMIN_TOKEN) {
    return NextResponse.next();
  }

  return new NextResponse("Unauthorized", { status: 401 });
}

export const config = {
  matcher: "/admin/:path*",
};
