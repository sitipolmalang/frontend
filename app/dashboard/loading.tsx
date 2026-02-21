export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <main className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="h-8 w-40 animate-pulse rounded bg-zinc-200" />
          <div className="h-9 w-24 animate-pulse rounded bg-zinc-200" />
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="h-6 w-44 animate-pulse rounded bg-zinc-200" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="h-24 animate-pulse rounded-xl bg-zinc-100" />
            <div className="h-24 animate-pulse rounded-xl bg-zinc-100" />
            <div className="h-24 animate-pulse rounded-xl bg-zinc-100" />
            <div className="h-24 animate-pulse rounded-xl bg-zinc-100" />
          </div>
        </section>
      </main>
    </div>
  );
}
