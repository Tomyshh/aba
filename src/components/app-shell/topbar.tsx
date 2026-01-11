"use client";

import { useTranslations } from "next-intl";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Topbar() {
  const t = useTranslations("common");

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="relative w-full max-w-[520px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45 dark:text-white/50" />
        <Input className="pl-9" placeholder={t("search")} />
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[rgb(var(--primary))] to-indigo-500" />
      </div>
    </header>
  );
}


