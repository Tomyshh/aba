"use client";

import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import { useHistory } from "@/hooks/use-history";
import type { JobStatus } from "@/lib/types";

function countBy(items: { status?: JobStatus }[], status: JobStatus) {
  return items.filter((x) => x.status === status).length;
}

export function StatsCards() {
  const t = useTranslations("dashboard.stats");
  const { items } = useHistory();

  const total = items.length;
  const completed = countBy(items, "completed");
  const failed = countBy(items, "failed");
  const inProgress = countBy(items, "pending") + countBy(items, "processing");

  const stats = [
    { label: t("total"), value: total },
    { label: t("completed"), value: completed },
    { label: t("inProgress"), value: inProgress },
    { label: t("failed"), value: failed },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="overflow-hidden">
          <CardContent className="pt-5">
            <div className="text-xs text-black/55 dark:text-white/60">{s.label}</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">{s.value}</div>
            <div className="mt-4 h-1 w-full rounded-full bg-black/5 dark:bg-white/10">
              <div className="h-1 w-1/2 rounded-full bg-[rgb(var(--primary))]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


