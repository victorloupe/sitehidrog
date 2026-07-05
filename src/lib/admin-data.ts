import { hasSupabase } from "./supabase/client";
import { createClient as createServerSupabase } from "./supabase/server";
import { getLocalQuotes, updateLocalQuoteStatus } from "./quotes-store";
import { getLocalSubscribers, deleteLocalSubscriber, NewsletterSubscriber } from "./newsletter-store";
import { Quote, SelectedVariation } from "./types";

interface DBQuoteItemRow {
  product_id: string | null;
  product_name_snapshot: string;
  quantity: number;
  selected_variations: SelectedVariation[] | null;
  notes?: string | null;
}

interface DBQuoteRow {
  id: string;
  customer_name: string;
  document_number: string | null;
  document_type: "cpf" | "cnpj" | null;
  email: string | null;
  phone: string | null;
  address_zip: string | null;
  address_street: string;
  address_number: string | null;
  address_complement: string | null;
  address_neighborhood: string | null;
  address_city: string;
  address_state: string;
  notes: string | null;
  status: "novo" | "em_andamento" | "respondido" | "finalizado";
  created_at: string;
  quote_items?: DBQuoteItemRow[];
}

export async function getQuotes(): Promise<Quote[]> {
  if (!hasSupabase) return getLocalQuotes();

  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("quotes")
    .select("*, quote_items(*)")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return (data as unknown as DBQuoteRow[]).map((row: DBQuoteRow) => ({
    id: row.id,
    customer_name: row.customer_name,
    document_number: row.document_number ?? undefined,
    document_type: row.document_type ?? undefined,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    address_zip: row.address_zip ?? undefined,
    address_street: row.address_street,
    address_number: row.address_number ?? undefined,
    address_complement: row.address_complement ?? undefined,
    address_neighborhood: row.address_neighborhood ?? undefined,
    address_city: row.address_city,
    address_state: row.address_state,
    notes: row.notes ?? undefined,
    status: row.status,
    created_at: row.created_at,
    items: (row.quote_items ?? []).map((i: DBQuoteItemRow) => ({
      productId: i.product_id ?? "",
      productName: i.product_name_snapshot,
      productSlug: "",
      productImage: "",
      quantity: i.quantity,
      selectedVariations: i.selected_variations ?? [],
      notes: i.notes ?? undefined,
    })),
  }));
}

export async function getQuoteById(id: string): Promise<Quote | undefined> {
  const quotes = await getQuotes();
  return quotes.find((q) => q.id === id);
}

export async function updateQuoteStatus(id: string, status: Quote["status"]): Promise<void> {
  if (!hasSupabase) {
    await updateLocalQuoteStatus(id, status);
    return;
  }
  const supabase = await createServerSupabase();
  await supabase.from("quotes").update({ status }).eq("id", id);
}

export async function getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  if (!hasSupabase) return getLocalSubscribers();

  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as NewsletterSubscriber[];
}

export async function deleteNewsletterSubscriber(id: string): Promise<void> {
  if (!hasSupabase) {
    await deleteLocalSubscriber(id);
    return;
  }
  const supabase = await createServerSupabase();
  await supabase.from("newsletter_subscribers").delete().eq("id", id);
}
