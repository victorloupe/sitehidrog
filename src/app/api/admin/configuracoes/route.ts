import { NextRequest, NextResponse } from "next/server";
import { hasSupabase } from "@/lib/supabase/client";
import { createClient as createServerSupabase } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  if (!hasSupabase) {
    return NextResponse.json(
      { error: "Conecte o Supabase para salvar as informações de contato (veja README.md)." },
      { status: 400 }
    );
  }

  const body = await req.json();
  const supabase = await createServerSupabase();

  const update = {
    phone: String(body.phone ?? "").trim(),
    whatsapp_number: String(body.whatsapp_number ?? "").replace(/\D/g, ""),
    whatsapp_display: String(body.whatsapp_display ?? "").trim(),
    email: String(body.email ?? "").trim(),
    address: String(body.address ?? "").trim(),
    instagram_url: String(body.instagram_url ?? "").trim(),
    facebook_url: String(body.facebook_url ?? "").trim(),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("site_settings").upsert({ id: 1, ...update });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
