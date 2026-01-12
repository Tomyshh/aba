import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { defaultLocale, locales } from "./src/i18n/config";
import { getSupabaseEnv } from "./src/lib/supabase/env";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "never",
});

export default async function middleware(req: NextRequest) {
  const res = intlMiddleware(req);
  const pathname = req.nextUrl.pathname;

  // Public routes
  const isLogin = pathname === "/login" || pathname.startsWith("/login/");
  const isPublic = isLogin;
  // Protected routes (app routes that need auth)
  const isProtected = pathname.startsWith("/dashboard") || 
                      pathname.startsWith("/jobs") || 
                      pathname.startsWith("/glossary") || 
                      pathname.startsWith("/settings") ||
                      pathname === "/";

  // Protect app routes; keep other things (api/_next/files) out via matcher
  try {
    const { url, anonKey } = getSupabaseEnv();
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user && isProtected) {
      const nextUrl = req.nextUrl.clone();
      nextUrl.pathname = "/login";
      // optional: preserve destination
      nextUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(nextUrl, { headers: res.headers });
    }

    if (user && isLogin) {
      const nextUrl = req.nextUrl.clone();
      nextUrl.pathname = "/dashboard";
      nextUrl.search = "";
      return NextResponse.redirect(nextUrl, { headers: res.headers });
    }
  } catch {
    // If env is not set, still protect routes by redirecting to login
    if (isProtected && !isLogin) {
      const nextUrl = req.nextUrl.clone();
      nextUrl.pathname = "/login";
      nextUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(nextUrl, { headers: res.headers });
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};


