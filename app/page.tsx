export default function Home() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
  const loginUrl = `${apiBaseUrl}/auth/google/redirect`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-6">
      <main className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-zinc-900">Google Login Demo</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Klik tombol di bawah untuk login menggunakan akun Google melalui Laravel API.
        </p>
        <a
          href={loginUrl}
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Login with Google
        </a>
        <a
          href="/profile"
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
        >
          Buka Profile
        </a>
      </main>
    </div>
  );
}
