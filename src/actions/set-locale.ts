"use server";

import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export async function setLocale(nextLocale: string) {
  const locale: Locale = isLocale(nextLocale) ? nextLocale : defaultLocale;
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, { path: "/" });
}


