import { NextResponse } from "next/server";
import { hasSupabase } from "@/lib/supabase/client";
import { createClient as createServerSupabase } from "@/lib/supabase/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";

export async function POST() {
  if (hasSupabase) {
    const supabase = await createServerSupabase();
    await supabase.auth.signOut();
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_SESSION_COOKIE);
  return res;
}
