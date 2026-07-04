import { NextRequest, NextResponse } from "next/server";
import { hasSupabase } from "@/lib/supabase/client";
import { createClient as createServerSupabase } from "@/lib/supabase/server";
import { saveQuoteLocally } from "@/lib/quotes-store";
import { QuoteSubmission } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as QuoteSubmission;

  if (!body.customer_name || !body.address_street || !body.address_city || !body.address_state) {
    return NextResponse.json(
      { error: "Campos obrigatórios ausentes: nome, endereço, cidade e estado." },
      { status: 400 }
    );
  }
  if (!body.items || body.items.length === 0) {
    return NextResponse.json({ error: "A cotação precisa ter ao menos um produto." }, { status: 400 });
  }

  if (!hasSupabase) {
    const quote = await saveQuoteLocally(body);
    return NextResponse.json({ ok: true, id: quote.id, mode: "local" });
  }

  const supabase = await createServerSupabase();

  const { data: quoteRow, error: quoteError } = await supabase
    .from("quotes")
    .insert({
      customer_name: body.customer_name,
      document_number: body.document_number,
      document_type: body.document_type,
      email: body.email,
      phone: body.phone,
      address_zip: body.address_zip,
      address_street: body.address_street,
      address_number: body.address_number,
      address_complement: body.address_complement,
      address_neighborhood: body.address_neighborhood,
      address_city: body.address_city,
      address_state: body.address_state,
      notes: body.notes,
    })
    .select()
    .single();

  if (quoteError || !quoteRow) {
    return NextResponse.json({ error: quoteError?.message ?? "Erro ao salvar cotação" }, { status: 500 });
  }

  const items = body.items.map((item) => ({
    quote_id: quoteRow.id,
    product_id: item.productId,
    product_name_snapshot: item.productName,
    selected_variations: item.selectedVariations,
    quantity: item.quantity,
    notes: item.notes ?? null,
  }));

  const { error: itemsError } = await supabase.from("quote_items").insert(items);
  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: quoteRow.id, mode: "supabase" });
}
