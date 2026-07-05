import { NextRequest, NextResponse } from "next/server";
import { hasSupabase } from "@/lib/supabase/client";
import { createClient as createServerSupabase } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  if (!hasSupabase) {
    return NextResponse.json(
      { error: "Conecte o Supabase para cadastrar produtos reais (veja README.md)." },
      { status: 400 }
    );
  }

  const body = await req.json();
  const supabase = await createServerSupabase();

  const { data: product, error } = await supabase
    .from("products")
    .insert({
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
    })
    .select()
    .single();

  if (error || !product) {
    return NextResponse.json({ error: error?.message ?? "Erro ao criar produto" }, { status: 500 });
  }

  if (body.images?.length) {
    await supabase
      .from("product_images")
      .insert(body.images.map((url: string, i: number) => ({ product_id: product.id, url, sort_order: i })));
  }

  if (body.specs?.length) {
    await supabase.from("product_specs").insert(
      body.specs.map((s: any, i: number) => ({
        product_id: product.id,
        spec_name: s.spec_name,
        spec_value: s.spec_value,
        sort_order: i,
      }))
    );
  }

  if (body.variations?.length) {
    for (const [i, group] of body.variations.entries()) {
      const { data: groupRow } = await supabase
        .from("variation_groups")
        .insert({ product_id: product.id, name: group.name, sort_order: i })
        .select()
        .single();
      if (groupRow) {
        await supabase.from("variation_options").insert(
          group.options.map((o: any, j: number) => ({
            group_id: groupRow.id,
            value: o.value,
            price_