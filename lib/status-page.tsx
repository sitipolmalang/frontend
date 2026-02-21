import type { ReactNode } from "react";
import { AppLinkButton, AppPanel } from "@/lib/ui";

type StatusAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "outline" | "danger";
};

type StatusPageProps = {
  code: string;
  title: string;
  description: string;
  badgeClassName: string;
  actions: StatusAction[];
};

export function StatusPageLayout({
  code,
  title,
  description,
  badgeClassName,
  actions,
}: StatusPageProps): ReactNode {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-100 px-6 py-12 dark:bg-zinc-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(24,24,27,0.08),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(24,24,27,0.05),transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_40%)]" />

      <AppPanel className="auth-card-reveal relative w-full max-w-lg rounded-3xl border border-zinc-300/70 bg-white/85 p-8 text-center shadow-[0_40px_140px_-70px_rgba(24,24,27,0.28)] backdrop-blur-xl dark:border-white/15 dark:bg-white/[0.04] dark:shadow-[0_40px_140px_-70px_rgba(0,0,0,0.8)]">
        <p
          className={`mx-auto inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${badgeClassName}`}
        >
          {code}
        </p>

        <h1 className="mt-4 text-3xl font-semibold text-zinc-900 dark:text-white">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {description}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {actions.map((action) => (
            <AppLinkButton
              key={`${action.href}-${action.label}`}
              href={action.href}
              variant={action.variant ?? "outline"}
              className="rounded-xl px-4 py-2.5"
            >
              {action.label}
            </AppLinkButton>
          ))}
        </div>
      </AppPanel>
    </div>
  );
}
