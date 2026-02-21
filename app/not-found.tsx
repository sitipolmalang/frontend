import { StatusPageLayout } from "@/lib/status-page";

export default function NotFoundPage() {
  return (
    <StatusPageLayout
      code="404 Not Found"
      title="Halaman tidak ditemukan"
      description="URL yang kamu buka tidak tersedia atau sudah dipindahkan."
      badgeClassName="border border-sky-300 bg-sky-100 text-sky-700 dark:border-sky-400/30 dark:bg-sky-500/10 dark:text-sky-200"
      actions={[
        { href: "/", label: "Home", variant: "primary" },
        { href: "/dashboard", label: "Dashboard", variant: "outline" },
      ]}
    />
  );
}
