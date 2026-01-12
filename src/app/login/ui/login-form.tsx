"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Lock, Mail } from "lucide-react";

import { signInWithEmailPassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: { email: "", password: "" },
  });

  return (
    <Card className="border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur">
      <CardContent className="p-5">
        <form
          className="grid gap-4"
          onSubmit={handleSubmit(async (values) => {
            const res = await signInWithEmailPassword(values);
            if (!res.ok) {
              toast.error(t("errorTitle"), { description: res.message });
              return;
            }
            toast.success(t("success"));
            router.push("/dashboard");
            router.refresh();
          })}
        >
          <div className="grid gap-2">
            <div className="text-xs font-medium">{t("email")}</div>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45 dark:text-white/50" />
              <Input
                type="email"
                autoComplete="email"
                placeholder="name@company.com"
                className="pl-9"
                {...register("email")}
              />
            </div>
            {errors.email ? <div className="text-xs text-red-600">{t("invalidEmail")}</div> : null}
          </div>

          <div className="grid gap-2">
            <div className="text-xs font-medium">{t("password")}</div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45 dark:text-white/50" />
              <Input
                type="password"
                autoComplete="current-password"
                className="pl-9"
                {...register("password")}
              />
            </div>
            {errors.password ? <div className="text-xs text-red-600">{t("invalidPassword")}</div> : null}
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-1 w-full">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {t("submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


