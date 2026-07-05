import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

// Armazenamento local simples usado apenas quando o Supabase ainda não está
// configurado (.env.local vazio) — mesmo padrão de quotes-store.ts.
const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "newsletter-dev.json");

export type NewsletterSubscriber = {
  id: string;
  email: string;
  created_at: string;
};

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

export async function saveEmailLocally(email: string): Promise<void> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const subscribers: NewsletterSubscriber[] = JSON.parse(raw);

  if (subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase())) return;

  subscribers.unshift({ id: randomUUID(), email, created_at: new Date().toISOString() });
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2), "utf-8");
}

export async function getLocalSubscribers(): Promise<NewsletterSubscriber[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

export async function deleteLocalSubscriber(id: string): Promise<void> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const subscribers: NewsletterSubscriber[] = JSON.parse(raw);
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers.filter((s) => s.id !== id), null, 2), "utf-8");
}
