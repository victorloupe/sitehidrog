"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Não foi possível cadastrar seu e-mail agora.");
        return;
      }
      setDone(true);
      setEmail("");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <p className="mt-4 flex items-center gap-2 text-sm font-medium text-green-700">
        <CheckCircle2 size={16} /> Inscrição confirmada, obrigado!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand sm:flex-1"
      />
      <button
        type="submit"
        disabled={submitting}
        className="flex items-center justify-center gap-2 rounded-md bg-brand-dark px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b5a87] disabled:opacity-60"
      >
        {submitting && <Loader2 size={14} className="animate-spin" />}
        Quero receber
      </button>
      {error && <p className="w-full text-xs font-medium text-red-600">{error}</p>}
    </form>
  );
}
