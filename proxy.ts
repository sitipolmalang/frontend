import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAdminRole, checkSession } from "@/lib/auth-session";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAdminDashboardRoute = pathname.startsWith("/dashboard/admin");
  const isLoginRoute = pathname === "/login";

  if (!token && isDashboardRoute) {
    return NextResponse.redirect(new URL("/401", request.url));
  }

  if (!token) {
    return NextResponse.next();
  }

  const session = await checkSession(token);

  if (!session.isValid) {
    if (isDashboardRoute) {
      const response = NextResponse.redirect(new URL("/401", request.url));
      if (session.shouldClearCookie) {
        response.cookies.delete("auth_token");
      }
      return response;
    }

    if (isLoginRoute) {
      const response = NextResponse.next();
      if (session.shouldClearCookie) {
        response.cookies.delete("auth_token");
      }
      return response;
    }

    const response = NextResponse.next();
    if (session.shouldClearCookie) {
      response.cookies.delete("auth_token");
    }
    return response;
  }

  if (isLoginRoute && session.isValid) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isAdminDashboardRoute) {
    const adminCheck = await checkAdminRole(token);

    if (adminCheck.kind === "unauthorized") {
      const response = NextResponse.redirect(new URL("/401", request.url));
      if (adminCheck.shouldClearCookie) {
        response.cookies.delete("auth_token");
      }
      return response;
    }

    if (adminCheck.kind === "non_admin") {
      return NextResponse.redirect(new URL("/403", request.url));
    }

    if (adminCheck.kind === "error") {
      return NextResponse.redirect(new URL("/500", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
