import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { AppLinkButton, AppPanel, InfoTile } from "@/lib/ui";
import { getApiBaseUrl } from "@/lib/env";

type MeResponse = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

type MeResult =
  | { kind: "ok"; user: MeResponse }
  | { kind: "unauthorized" }
  | { kind: "error" };

async function getMe(token: string): Promise<MeResult> {
  const apiBaseUrl = getApiBaseUrl();

  const response = await fetch(`${apiBaseUrl}/api/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 401 || response.status === 403) {
    return { kind: "unauthorized" };
  }

  if (!response.ok) {
    return { kind: "error" };
  }

  return {
    kind: "ok",
    user: (await response.json()) as MeResponse,
  };
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/401");
  }

  const result = await getMe(token);

  if (result.kind === "unauthorized") {
    redirect("/401");
  }

  if (result.kind === "error") {
    redirect("/500");
  }

  const me = result.user;

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <main className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
          <div className="flex items-center gap-2">
            <AppLinkButton href="/" variant="outline" className="px-3">
              Home
            </AppLinkButton>
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
            <InfoTile label="User ID" value={me.id} />
            <InfoTile label="Joined" value={new Date(me.created_at).toLocaleString()} />
          </dl>
        </AppPanel>
      </main>
    </div>
  );
}
