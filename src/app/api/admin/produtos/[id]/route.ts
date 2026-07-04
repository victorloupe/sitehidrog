import { NextRequest, NextResponse } from "next/server";
import { hasSupabase } from "@/lib/supabase/client";
import { createClient as createServerSupabase } from "@/lib/supabase/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!hasSupabase) {
    return NextResponse.json(
      { error: "Conecte o Supabase para editar produtos reais (veja README.md)." },
      { status: 400 }
    );
  }

  const body = await req.json();
  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from("products")
    .update({
      name: body.name,
      slug: body.slug,
      short_description: body.short_description,
      description: body.description,
      category_id: body.category_id,
      brand_id: body.brand_id,
      sku: body.sku,
      price: body.price,
      show_price: body.show_price,
      is_best_seller: body.is_best_seller,
      is_active: body.is_active,
      stock_status: body.stock_status,
      main_image_url: body.main_image_url,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Substitui specs e variações existentes pelas novas
  await supabase.from("product_specs").delete().eq("product_id", id);
  if (body.specs?.length) {
    await supabase.from("product_specs").insert(
      body.specs.map((s: any, i: number) => ({ product_id: id, spec_name: s.spec_name, spec_value: s.spec_value, sort_order: i }))
    );
  }

  const { data: existingGroups } = await supabase.from("variation_groups").select("id").eq("product_id", id);
  if (existingGroups?.length) {
    await supabase.from("variation_groups").delete().eq("product_id", id);
  }
  if (body.variations?.length) {
    for (const [i, group] of body.variations.entries()) {
      const { data: groupRow } = await supabase
        .from("variation_groups")
        .insert({ product_id: id, name: group.name, sort_order: i })
        .select()
        .single();
      if (groupRow) {
        await supabase.from("variation_options").insert(
          group.options.map((o: any, j: number) => ({
            group_id: groupRow.id,
            value: o.value,
            price_delta: o.price_delta ?? 0,
            sort_order: j,
          }))
        );
      }
    }
  }

  await supabase.from("product_images").delete().eq("product_id", id);
  if (body.images?.length) {
    await supabase
      .from("product_images")
      .insert(body.images.map((url: string, i: number) => ({ product_id: id, url, sort_order: i })));
  } else if (body.main_image_url) {
    await supabase.from("product_images").insert({ product_id: id, url: body.main_image_url, sort_order: 0 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!hasSupabase) {
    return NextResponse.json({ error: "Conecte o Supabase para excluir produtos reais." }, { status: 400 });
  }
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
