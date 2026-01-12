import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { defaultLocale, locales } from "./src/i18n/config";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "never",
});

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Skip non-app routes
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Login page is public
  if (pathname === "/login" || pathname.startsWith("/login/")) {
    // Check if user is already logged in → redirect to dashboard
    const user = await getUser(req);
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return intlMiddleware(req);
  }

  // All other routes require auth
  const user = await getUser(req);
  
  if (!user) {
    // Not logged in → redirect to login
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // User is authenticated, continue
  return intlMiddleware(req);
}

async function getUser(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseAnonKey = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  )?.trim();

  if (!supabaseUrl || !supabaseAnonKey) {
    return null; // Supabase not configured = no user
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll() {
          // We don't need to set cookies in this check
        },
      },
    });

    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};


