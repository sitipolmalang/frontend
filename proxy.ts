import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasValidSession } from "@/lib/auth-session";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isLoginRoute = pathname === "/login";

  if (!token && isDashboardRoute) {
    return NextResponse.redirect(new URL("/401", request.url));
  }

  if (!token) {
    return NextResponse.next();
  }

  const isAuthenticated = await hasValidSession(token);

  if (!isAuthenticated) {
    if (isDashboardRoute) {
      const response = NextResponse.redirect(new URL("/401", request.url));
      response.cookies.delete("auth_token");
      return response;
    }

    if (isLoginRoute) {
      const response = NextResponse.next();
      response.cookies.delete("auth_token");
      return response;
    }
  }

  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
