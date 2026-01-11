"use client";

import { useMemo, useState } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { FileUp, Loader2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { startTranslation } from "@/lib/api";
import { useHistory } from "@/hooks/use-history";

const toOptionalNumber = (v: unknown) => {
  if (v === "" || v === null || v === undefined) return undefined;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : undefined;
};

const schema = z.object({
  targetLanguage: z.enum(["français", "english", "hebrew"]),
  ocrModel: z.string().optional(),
  translateModel: z.string().optional(),
  maxPages: z.preprocess(toOptionalNumber, z.number().int().min(0)).optional(),
  chunkMaxChars: z.preprocess(toOptionalNumber, z.number().int().min(200).max(4000)).optional(),
});

type FormValues = z.infer<typeof schema>;

export function UploadCard() {
  const tDash = useTranslations("dashboard");
  const t = useTranslations("upload");
  const tToasts = useTranslations("toasts");
  const router = useRouter();
  const { add } = useHistory();
  const [file, setFile] = useState<File | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    // NOTE: Zod v4 + resolvers typing can be stricter around preprocess/coerce.
    // We keep runtime validation and cast the resolver for RHF's generic.
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      targetLanguage: "français",
      ocrModel: "gpt-4o-mini",
      translateModel: "gpt-4o-mini",
      maxPages: 0,
      chunkMaxChars: 1400,
    },
  });

  const languageOptions = useMemo(
    () => [
      { value: "français" as const, label: "Français" },
      { value: "english" as const, label: "English" },
      { value: "hebrew" as const, label: "עברית" },
    ],
    [],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tDash("uploadTitle")}</CardTitle>
        <CardDescription>{t("dragDrop")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={handleSubmit(async (values) => {
            if (!file) {
              toast.error(t("selectFile"));
              return;
            }
            try {
              const { jobId } = await startTranslation({
                pdf: file,
                targetLanguage: values.targetLanguage,
                ocrModel: values.ocrModel,
                translateModel: values.translateModel,
                maxPages: values.maxPages,
                chunkMaxChars: values.chunkMaxChars,
              });

              add({
                jobId,
                filename: file.name,
                targetLanguage: values.targetLanguage,
                createdAt: new Date().toISOString(),
                status: "pending",
              });

              toast.success(tToasts("uploadStarted"));
              router.push(`/jobs/${jobId}`);
            } catch (e) {
              const msg = e instanceof Error ? e.message : String(e);
              toast.error(tToasts("uploadFailed"), { description: msg });
            }
          })}
        >
          <div className="grid gap-2">
            <div className="text-xs font-medium">{t("pdfLabel")}</div>
            <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-black/15 dark:border-white/15 bg-white/50 dark:bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[rgb(var(--primary))] text-white">
                  <FileUp className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{file?.name ?? t("selectFile")}</div>
                  <div className="text-xs text-black/55 dark:text-white/60">PDF</div>
                </div>
              </div>
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <div className="text-xs font-medium">{t("targetLanguage")}</div>
              <Select {...register("targetLanguage")}>
                {languageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
              {errors.targetLanguage ? (
                <div className="text-xs text-red-600">{errors.targetLanguage.message}</div>
              ) : null}
            </div>

            <div className="flex items-end justify-start md:justify-end">
              <Button type="button" variant="secondary" onClick={() => setShowAdvanced((v) => !v)}>
                {t("advanced")}
              </Button>
            </div>
          </div>

          {showAdvanced ? (
            <div className="grid gap-3 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 md:grid-cols-2">
              <div className="grid gap-2">
                <div className="text-xs font-medium">{t("ocrModel")}</div>
                <Input placeholder="gpt-4o-mini" {...register("ocrModel")} />
              </div>
              <div className="grid gap-2">
                <div className="text-xs font-medium">{t("translateModel")}</div>
                <Input placeholder="gpt-4o-mini" {...register("translateModel")} />
              </div>
              <div className="grid gap-2">
                <div className="text-xs font-medium">{t("maxPages")}</div>
                <Input type="number" min={0} {...register("maxPages")} />
              </div>
              <div className="grid gap-2">
                <div className="text-xs font-medium">{t("chunkMaxChars")}</div>
                <Input type="number" min={200} max={4000} {...register("chunkMaxChars")} />
              </div>
            </div>
          ) : null}

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isSubmitting} className="min-w-[220px]">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {t("submit")}
            </Button>
            <div className="text-xs text-black/55 dark:text-white/60">
              {file ? file.name : ""}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}


