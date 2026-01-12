import { useTranslations } from "next-intl";

import { StatsCards } from "@/components/dashboard/stats-cards";
import { UploadCard } from "@/components/dashboard/upload-card";
import { RecentJobs } from "@/components/dashboard/recent-jobs";

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{t("title")}</h1>
        </div>
      </div>

      <StatsCards />

      <UploadCard />
      <RecentJobs />
    </div>
  );
}


