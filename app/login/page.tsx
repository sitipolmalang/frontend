export default function LoginPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
  const loginUrl = `${apiBaseUrl}/auth/google/redirect`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-[0_18px_70px_-45px_rgba(15,23,42,0.45)]">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-900">Sign in</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Continue to your dashboard.
          </p>
        </div>

        <a
          href={loginUrl}
          className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
        >
          Continue with Google
        </a>

        <p className="mt-6 text-center text-xs text-zinc-400">
          Protected by secure OAuth and httpOnly session cookie.
        </p>
      </main>
    </div>
  );
}
