import { AppLinkButton, AppPanel } from "@/lib/ui";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12">
      <AppPanel className="w-full max-w-md p-8 text-center shadow-[0_18px_70px_-45px_rgba(15,23,42,0.45)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          403 Forbidden
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-zinc-900">
          Akses ditolak
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Kamu tidak memiliki izin untuk membuka halaman ini.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <AppLinkButton href="/dashboard" variant="primary">
            Dashboard
          </AppLinkButton>
          <AppLinkButton href="/" variant="outline">
            Home
          </AppLinkButton>
        </div>
      </AppPanel>
    </div>
  );
}
