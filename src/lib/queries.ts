import { hasSupabase } from "./supabase/client";
import { createClient as createServerSupabase } from "./supabase/server";
import {
  mockBrands,
  mockCategories,
  mockProducts,
  defaultSiteSettings,
  getMockProductBySlug,
  getMockRelatedProducts,
} from "./mock-data";
import { Brand, Category, Product, SiteSettings } from "./types";

interface DBProductImage {
  url: string;
  sort_order?: number;
}

interface DBSpec {
  spec_name: string;
  spec_value: string;
  sort_order?: number;
}

interface DBVariationOption {
  id: string;
  value: string;
  price_delta?: number | string | null;
}

interface DBVariationGroup {
  id: string;
  name: string;
  variation_options?: DBVariationOption[];
}

interface DBProductRow {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  category_id: string | null;
  brand_id: string | null;
  sku: string | null;
  price: number | null;
  show_price: boolean;
  is_best_seller: boolean;
  is_active: boolean;
  stock_status: "disponivel" | "sob_consulta" | "indisponivel";
  main_image_url: string;
  product_images?: DBProductImage[];
  product_specs?: DBSpec[];
  variation_groups?: DBVariationGroup[];
}

function mapProductRow(row: DBProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    short_description: row.short_description,
    description: row.description,
    category_id: row.category_id,
    brand_id: row.brand_id,
    sku: row.sku,
    price: row.price,
    show_price: row.show_price,
    is_best_seller: row.is_best_seller,
    is_active: row.is_active,
    stock_status: row.stock_status,
    main_image_url: row.main_image_url,
    images: (row.product_images ?? [])
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((i) => i.url),
    specs: (row.product_specs ?? [])
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((s) => ({ spec_name: s.spec_name, spec_value: s.spec_value })),
    variations: (row.variation_groups ?? []).map((g) => ({
      id: g.id,
      name: g.name,
      options: (g.variation_options ?? []).map((o) => ({
        id: o.id,
        value: o.value,
        price_delta: Number(o.price_delta ?? 0),
      })),
    })),
  };
}

const PRODUCT_SELECT =
  "*, product_images(*), product_specs(*), variation_groups(*, variation_options(*))";

export async function getCategories(): Promise<Category[]> {
  if (!hasSupabase) return mockCategories;
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("show_in_menu", true)
    .order("sort_order", { ascending: true });
  if (error || !data) return mockCategories;
  return data as Category[];
}

export async function getBrands(): Promise<Brand[]> {
  if (!hasSupabase) return mockBrands;
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("brands").select("*").order("sort_order", { ascending: true });
  if (error || !data) return mockBrands;
  return data as Brand[];
}

export async function getBestSellers(limit = 8): Promise<Product[]> {
  if (!hasSupabase) return mockProducts.filter((p) => p.is_best_seller).slice(0, limit);
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_best_seller", true)
    .eq("is_active", true)
    .limit(limit);
  if (error || !data) return mockProducts.filter((p) => p.is_best_seller).slice(0, limit);
  return data.map(mapProductRow);
}

export async function getAllProducts(): Promise<Product[]> {
  if (!hasSupabase) return mockProducts;
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).eq("is_active", true);
  if (error || !data) return mockProducts;
  return data.map(mapProductRow);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!hasSupabase) return getMockProductBySlug(slug);
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).eq("slug", slug).single();
  if (error || !data) return getMockProductBySlug(slug);
  return mapProductRow(data);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  if (!hasSupabase) return getMockRelatedProducts(product, limit);
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("category_id", product.category_id ?? "")
    .neq("id", product.id)
    .eq("is_active", true)
    .limit(limit);
  if (error || !data) return getMockRelatedProducts(product, limit);
  return data.map(mapProductRow);
}

export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  const all = await getAllProducts();
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return [];
  return all.filter((p) => p.category_id === category.id);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasSupabase) return defaultSiteSettings;
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  if (error || !data) return defaultSiteSettings;
  return {
    phone: data.phone || defaultSiteSettings.phone,
    whatsapp_number: data.whatsapp_number || defaultSiteSettings.whatsapp_number,
    whatsapp_display: data.whatsapp_display || defaultSiteSettings.whatsapp_display,
    email: data.email || defaultSiteSettings.email,
    address: data.address || defaultSiteSettings.address,
    instagram_url: data.instagram_url || defaultSiteSettings.instagram_url,
    facebook_url: data.facebook_url || defaultSiteSettings.facebook_url,
  };
}
