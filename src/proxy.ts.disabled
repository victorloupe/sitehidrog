import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";

const PUBLIC_ADMIN_PATHS = ["/admin/login"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const hasSupabase = Boolean(url && key);

  if (hasSupabase) {
    const res = NextResponse.next();
    const supabase = createServerClient(url as string, key as string, {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
        },
      },
    });
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return res;
  }

  const localSession = req.cookies.get(ADMIN_SESSION_COOKIE);
  if (!localSession) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
