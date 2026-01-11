"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { locales } from "@/i18n/config";
import { setLocale } from "@/actions/set-locale";
import { Select } from "@/components/ui/select";

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-black/55 dark:text-white/60">{t("language")}</span>
      <Select
        value={locale}
        disabled={isPending}
        onChange={(e) => {
          const next = e.target.value;
          startTransition(async () => {
            await setLocale(next);
            router.refresh();
          });
        }}
        className="h-9 w-[140px] bg-white/60 dark:bg-white/5"
        aria-label={t("language")}
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
      </Select>
    </div>
  );
}


