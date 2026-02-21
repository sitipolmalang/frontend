import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

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
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

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
    redirect("/login");
  }

  const result = await getMe(token);

  if (result.kind === "unauthorized") {
    redirect("/login");
  }

  if (result.kind === "error") {
    return (
      <div className="min-h-screen bg-zinc-50 px-6 py-10">
        <main className="mx-auto w-full max-w-5xl">
          <section className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center">
            <h2 className="text-base font-semibold text-zinc-900">
              Dashboard belum tersedia
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Terjadi kendala saat memuat data akun.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
            >
              Kembali ke Home
            </Link>
          </section>
        </main>
      </div>
    );
  }

  const me = result.user;

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <main className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              Home
            </Link>
            <LogoutButton />
          </div>
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-zinc-900">
            Account Overview
          </h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <dt className="text-xs uppercase tracking-wide text-zinc-500">
                Name
              </dt>
              <dd className="mt-2 text-sm font-medium text-zinc-900">
                {me.name}
              </dd>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <dt className="text-xs uppercase tracking-wide text-zinc-500">
                Email
              </dt>
              <dd className="mt-2 text-sm font-medium text-zinc-900">
                {me.email}
              </dd>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <dt className="text-xs uppercase tracking-wide text-zinc-500">
                User ID
              </dt>
              <dd className="mt-2 text-sm font-medium text-zinc-900">
                {me.id}
              </dd>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <dt className="text-xs uppercase tracking-wide text-zinc-500">
                Joined
              </dt>
              <dd className="mt-2 text-sm font-medium text-zinc-900">
                {new Date(me.created_at).toLocaleString()}
              </dd>
            </div>
          </dl>
        </section>
      </main>
    </div>
  );
}
