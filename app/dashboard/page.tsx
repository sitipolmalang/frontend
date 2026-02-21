import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import SessionRefresher from "./SessionRefresher";
import { AppLinkButton, AppPanel, InfoTile } from "@/lib/ui";
import { getMe, getMyActivity } from "@/lib/api-auth";
import { getAuthCookieName } from "@/lib/env";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAuthCookieName())?.value;

  if (!token) {
    redirect("/401");
  }

  const result = await getMe(token);

  if (result.kind === "unauthorized" || result.kind === "forbidden") {
    redirect("/401");
  }

  if (result.kind === "error") {
    redirect("/500");
  }

  const me = result.data;
  const activityResult = await getMyActivity(token);

  if (activityResult.kind === "unauthorized" || activityResult.kind === "forbidden") {
    redirect("/401");
  }

  if (activityResult.kind === "error") {
    redirect("/500");
  }

  const activity = activityResult.data;

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <SessionRefresher />
      <main className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Role:
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  me.role === "admin"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-zinc-200 text-zinc-700"
                }`}
              >
                {me.role === "admin" ? "Admin" : "User"}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AppLinkButton href="/" variant="outline" className="px-3">
              Home
            </AppLinkButton>
            {me.role === "admin" ? (
              <AppLinkButton href="/dashboard/admin" variant="secondary" className="px-3">
                Admin
              </AppLinkButton>
            ) : null}
            <LogoutButton />
          </div>
        </div>

        <AppPanel className="p-6">
          <h2 className="text-base font-semibold text-zinc-900">
            Account Overview
          </h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <InfoTile label="Name" value={me.name} />
            <InfoTile label="Email" value={me.email} />
            <InfoTile label="Role" value={me.role === "admin" ? "Admin" : "User"} />
            <InfoTile label="User ID" value={me.id} />
            <InfoTile label="Joined" value={new Date(me.created_at).toLocaleString()} />
          </dl>
        </AppPanel>

        <AppPanel className="mt-6 p-6">
          <h2 className="text-base font-semibold text-zinc-900">
            Recent Auth Activity
          </h2>

          {activity.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-500">
              Belum ada aktivitas login/logout yang tercatat.
            </p>
          ) : null}

          {activity.length > 0 ? (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-xl border border-zinc-200">
                <thead className="bg-zinc-100 text-left text-xs uppercase tracking-wide text-zinc-500">
                  <tr>
                    <th className="px-3 py-2">Event</th>
                    <th className="px-3 py-2">Waktu</th>
                    <th className="px-3 py-2">IP</th>
                    <th className="px-3 py-2">Request ID</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-sm text-zinc-700">
                  {activity.map((item, index) => (
                    <tr
                      key={`${item.created_at}-${index}`}
                      className={index < activity.length - 1 ? "border-b border-zinc-100" : ""}
                    >
                      <td className="px-3 py-2">{item.event}</td>
                      <td className="px-3 py-2">
                        {new Date(item.created_at).toLocaleString()}
                      </td>
                      <td className="px-3 py-2">{item.ip_address ?? "-"}</td>
                      <td className="px-3 py-2">{item.request_id ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </AppPanel>
      </main>
    </div>
  );
}
