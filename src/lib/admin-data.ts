import { hasSupabase } from "./supabase/client";
import { createClient as createServerSupabase } from "./supabase/server";
import { getLocalQuotes, updateLocalQuoteStatus } from "./quotes-store";
import { getLocalSubscribers, deleteLocalSubscriber, NewsletterSubscriber } from "./newsletter-store";
import { Quote } from "./types";

export async function getQuotes(): Promise<Quote[]> {
  if (!hasSupabase) return getLocalQuotes();

  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("quotes")
    .select("*, quote_items(*)")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row: any) => ({
    id: row.id,
    customer_name: row.customer_name,
    document_number: row.document_number,
    document_type: row.document_type,
    email: row.email,
    phone: row.phone,
    address_zip: row.address_zip,
    address_street: row.address_street,
    address_number: row.address_number,
    address_complement: row.address_complement,
    address_neighborhood: row.address_neighborhood,
    address_city: row.address_city,
    address_state: row.address_state,
    notes: row.notes,
    status: row.status,
    created_at: row.created_at,
    items: (row.quote_items ?? []).map((i: any) => ({
      productId: i.product_id,
      productName: i.product_name_snapshot,
      productSlug: "",
      productImage: "",
      quantity: i.quantity,
      selectedVariations: i.selected_variations ?? [],
      notes: i.notes,
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
