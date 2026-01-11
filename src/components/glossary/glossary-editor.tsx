"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Plus, Save, Trash2 } from "lucide-react";

import { getGlossary, saveGlossary } from "@/lib/api";
import type { GlossaryEntry } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function GlossaryEditor() {
  const t = useTranslations("glossary");
  const tc = useTranslations("common");

  const q = useQuery({
    queryKey: ["glossary"],
    queryFn: getGlossary,
  });

  const [rows, setRows] = useState<GlossaryEntry[]>([]);

  useEffect(() => {
    if (q.data?.entries) setRows(q.data.entries);
  }, [q.data?.entries]);

  const mutation = useMutation({
    mutationFn: (entries: GlossaryEntry[]) => saveGlossary(entries),
    onSuccess: () => toast.success(t("saved")),
    onError: (e) => toast.error("Error", { description: e instanceof Error ? e.message : String(e) }),
  });

  const canSave = useMemo(() => rows.some((r) => r.source.trim() || r.target.trim()), [rows]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Button
            variant="secondary"
            onClick={() => setRows((prev) => [{ source: "", target: "" }, ...prev])}
          >
            <Plus className="h-4 w-4" />
            {t("addRow")}
          </Button>

          <Button
            onClick={() => mutation.mutate(rows.filter((r) => r.source.trim() || r.target.trim()))}
            disabled={!canSave || mutation.isPending}
          >
            <Save className="h-4 w-4" />
            {tc("save")}
          </Button>
        </div>

        {q.isLoading ? (
          <div className="text-sm text-black/55 dark:text-white/60">Loading…</div>
        ) : q.isError ? (
          <div className="text-sm text-red-600">{(q.error as Error).message}</div>
        ) : (
          <div className="space-y-2">
            <div className="hidden grid-cols-[1fr_1fr_40px] gap-2 px-2 text-xs font-medium text-black/55 dark:text-white/60 md:grid">
              <div>{t("source")}</div>
              <div>{t("target")}</div>
              <div />
            </div>
            {rows.length === 0 ? (
              <div className="text-sm text-black/55 dark:text-white/60">—</div>
            ) : (
              rows.map((row, idx) => (
                <div
                  key={`${idx}-${row.source}-${row.target}`}
                  className="grid grid-cols-1 gap-2 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 p-3 md:grid-cols-[1fr_1fr_40px] md:items-center"
                >
                  <Input
                    value={row.source}
                    onChange={(e) =>
                      setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, source: e.target.value } : r)))
                    }
                    placeholder={t("source")}
                    className="font-[var(--font-noto-hebrew)]"
                  />
                  <Input
                    value={row.target}
                    onChange={(e) =>
                      setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, target: e.target.value } : r)))
                    }
                    placeholder={t("target")}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRows((prev) => prev.filter((_, i) => i !== idx))}
                    aria-label={tc("delete")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


