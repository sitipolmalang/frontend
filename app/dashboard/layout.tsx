import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SessionRefresher from "./SessionRefresher";
import DashboardSidebar from "./DashboardSidebar";
import { getMe } from "@/lib/api-auth";
import { getAuthCookieName } from "@/lib/env";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAuthCookieName())?.value;

  if (!token) {
    redirect("/401");
  }

  const meResult = await getMe(token);

  if (meResult.kind === "unauthorized" || meResult.kind === "forbidden") {
    redirect("/401");
  }

  if (meResult.kind === "error") {
    redirect("/500");
  }

  const me = meResult.data;

  return (
    <div className="min-h-screen bg-zinc-50">
      <SessionRefresher />
      <DashboardSidebar
        user={{
          name: me.name,
          email: me.email,
          role: me.role,
        }}
      >
        {children}
      </DashboardSidebar>
    </div>
  );
}
