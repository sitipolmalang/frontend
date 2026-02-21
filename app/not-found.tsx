import { AppLinkButton, AppPanel } from "@/lib/ui";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12">
      <AppPanel className="w-full max-w-md p-8 text-center shadow-[0_18px_70px_-45px_rgba(15,23,42,0.45)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          404 Not Found
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-zinc-900">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          URL yang kamu buka tidak tersedia atau sudah dipindahkan.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <AppLinkButton href="/" variant="primary">
            Home
          </AppLinkButton>
          <AppLinkButton href="/dashboard" variant="outline">
            Dashboard
          </AppLinkButton>
        </div>
      </AppPanel>
    </div>
  );
}
