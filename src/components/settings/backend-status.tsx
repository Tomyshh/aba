"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { healthCheck } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function BackendStatus() {
  const t = useTranslations("settings");

  const q = useQuery({
    queryKey: ["health"],
    queryFn: healthCheck,
    refetchInterval: 15_000,
  });

  const ok = q.data?.ok === true;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{t("health")}:</span>
      <Badge
        className={cn(
          "border",
          ok
            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
            : "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/20",
        )}
      >
        {ok ? t("ok") : t("notOk")}
      </Badge>
    </div>
  );
}


