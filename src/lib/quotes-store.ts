import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { Quote, QuoteSubmission } from "./types";

// Armazenamento local simples usado apenas quando o Supabase ainda não está
// configurado (.env.local vazio). Serve para você testar o fluxo de cotação
// e visualizar os pedidos no painel admin antes de conectar o banco de dados
// real. Assim que o Supabase for configurado, os dados passam a ser
// gravados nas tabelas `quotes` e `quote_items` (ver lib/queries.ts).
const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "quotes-dev.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

export async function saveQuoteLocally(submission: QuoteSubmission): Promise<Quote> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const quotes: Quote[] = JSON.parse(raw);

  const quote: Quote = {
    ...submission,
    id: randomUUID(),
    status: "novo",
    created_at: new Date().toISOString(),
  };

  quotes.unshift(quote);
  await fs.writeFile(DATA_FILE, JSON.stringify(quotes, null, 2), "utf-8");
  return quote;
}

export async function getLocalQuotes(): Promise<Quote[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

export async function updateLocalQuoteStatus(id: string, status: Quote["status"]): Promise<void> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const quotes: Quote[] = JSON.parse(raw);
  const updated = quotes.map((q) => (q.id === id ? { ...q, status } : q));
  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
}
