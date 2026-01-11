import { useTranslations } from "next-intl";

import { StatsCards } from "@/components/dashboard/stats-cards";
import { UploadCard } from "@/components/dashboard/upload-card";
import { RecentJobs } from "@/components/dashboard/recent-jobs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{t("title")}</h1>
          <div className="mt-1 text-sm text-black/55 dark:text-white/60">
            Growing Super Human Rate Funnels
          </div>
        </div>
      </div>

      <StatsCards />

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <UploadCard />
          <RecentJobs />
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))] to-indigo-500 p-4 text-white">
                <div className="text-xs text-white/80">Active visitors right now</div>
                <div className="mt-2 text-2xl font-semibold">—</div>
                <div className="mt-3 h-16 rounded-xl bg-white/15" />
              </div>
              <div className="mt-4 text-sm text-black/55 dark:text-white/60">
                Astuce : lance une traduction pour voir le suivi en temps réel.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


