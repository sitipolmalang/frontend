import { StatusPageLayout } from "@/lib/status-page";

export default function ForbiddenPage() {
  return (
    <StatusPageLayout
      code="403 Forbidden"
      title="Akses ditolak"
      description="Akun kamu tidak memiliki izin untuk membuka halaman ini."
      badgeClassName="border border-rose-300 bg-rose-100 text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200"
      actions={[
        { href: "/dashboard", label: "Dashboard", variant: "primary" },
        { href: "/", label: "Home", variant: "outline" },
      ]}
    />
  );
}
