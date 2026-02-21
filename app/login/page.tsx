import { AppAnchorButton, AppPanel } from "@/lib/ui";
import { getApiBaseUrl } from "@/lib/env";

export default function LoginPage() {
  const apiBaseUrl = getApiBaseUrl();
  const loginUrl = `${apiBaseUrl}/auth/google/redirect`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12">
      <AppPanel className="w-full max-w-md p-8 shadow-[0_18px_70px_-45px_rgba(15,23,42,0.45)]">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-900">Sign in</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Continue to your dashboard.
          </p>
        </div>

        <AppAnchorButton
          href={loginUrl}
          variant="outline"
          className="w-full rounded-xl border-zinc-300 bg-white px-4 py-3 text-zinc-800 hover:bg-zinc-50"
        >
          Continue with Google
        </AppAnchorButton>

        <p className="mt-6 text-center text-xs text-zinc-400">
          Protected by secure OAuth and httpOnly session cookie.
        </p>
      </AppPanel>
    </div>
  );
}
