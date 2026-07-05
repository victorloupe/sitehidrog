import { NextRequest, NextResponse } from "next/server";
import { hasSupabase } from "@/lib/supabase/client";
import { createClient as createServerSupabase } from "@/lib/supabase/server";
import { saveEmailLocally } from "@/lib/newsletter-store";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Rota pública (sem requireAdmin) — qualquer visitante pode se inscrever
// na newsletter. A leitura da lista é restrita a admin (RLS + rota
// /admin/newsletter).
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }

  if (!hasSupabase) {
    await saveEmailLocally(email);
    return NextResponse.json({ ok: true });
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.from("newsletter_subscribers").insert({ email });

  // E-mail já cadastrado não é um erro do ponto de vista do visitante.
  if (error && !error.message.toLowerCase().includes("duplicate")) {
    return NextResponse.json({ error: "Não foi possível cadastrar seu e-mail agora." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
