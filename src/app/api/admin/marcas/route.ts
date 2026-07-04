import { NextRequest, NextResponse } from "next/server";
import { hasSupabase } from "@/lib/supabase/client";
import { createClient as createServerSupabase } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  if (!hasSupabase) {
    return NextResponse.json({ error: "Conecte o Supabase para cadastrar marcas reais." }, { status: 400 });
  }
  const body = await req.json();
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("brands").insert({
    name: body.name,
    slug: body.slug,
    logo_url: body.logo_url || null,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
