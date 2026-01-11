import { useTranslations } from "next-intl";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BackendStatus } from "@/components/settings/backend-status";

export default function SettingsPage() {
  const t = useTranslations("settings");

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("backendDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="text-sm">
              <span className="font-medium">{t("backend")}:</span>{" "}
              <span className="font-mono text-xs text-black/60 dark:text-white/60">
                {process.env.ABA_BACKEND_URL?.trim() || "https://aba-backend-9lba.onrender.com"}
              </span>
            </div>
            <BackendStatus />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


