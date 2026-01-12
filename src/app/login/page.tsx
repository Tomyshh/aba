import { useTranslations } from "next-intl";

import { LoginForm } from "./ui/login-form";

export default function LoginPage() {
  const t = useTranslations("auth");

  return (
    <div className="min-h-dvh bg-[rgb(var(--bg))]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.25),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.20),transparent_40%)]" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[520px] flex-col justify-center px-5 py-10">
        <div className="mb-6 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))] to-indigo-500 text-white shadow-sm">
            A
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">{t("title")}</h1>
          <p className="mt-1 text-sm text-black/55 dark:text-white/60">{t("subtitle")}</p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-xs text-black/45 dark:text-white/50">
          {t("hint")}
        </p>
      </div>
    </div>
  );
}


