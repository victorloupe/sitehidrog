import { NextRequest, NextResponse } from "next/server";
import { hasSupabase } from "@/lib/supabase/client";
import { createClient as createServerSupabase } from "@/lib/supabase/server";
import { ADMIN_SESSION_COOKIE, getLocalAdminPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (hasSupabase) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return NextResponse.json({ error: "E-mail ou senha inválidos." }, { status: 401 });
    }
    return NextResponse.json({ ok: true });
  }

  const submittedPassword = String(password ?? "").trim();
  if (submittedPassword !== getLocalAdminPassword().trim()) {
    return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
