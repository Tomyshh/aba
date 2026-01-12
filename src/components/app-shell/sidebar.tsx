"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./nav";

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <aside className="hidden lg:flex lg:w-[280px] lg:flex-col lg:gap-6 lg:px-2 lg:py-2">
      <div className="rounded-3xl bg-gradient-to-b from-[rgb(var(--sidebar))] to-[rgb(var(--sidebar-2))] p-5 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/20 font-semibold">
            A
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">Tourgeman</div>
            <div className="truncate text-xs text-white/75">ABA</div>
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-white dark:bg-white/10 shadow-sm"
                  : "hover:bg-white/60 dark:hover:bg-white/5",
              )}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-xl border border-black/5 dark:border-white/10",
                    active ? "bg-[rgb(var(--primary))] text-white border-transparent" : "bg-white/60 dark:bg-white/5",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-medium">{t(item.key)}</span>
              </span>
              <ChevronRight
                className={cn(
                  "h-4 w-4 opacity-0 transition-opacity group-hover:opacity-60",
                  active && "opacity-60",
                )}
              />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}


