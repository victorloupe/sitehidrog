"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle, Printer, Trash2, Loader2 } from "lucide-react";

export default function QuoteActions({
  quoteId,
  customerName,
  phone,
  redirectOnDelete,
}: {
  quoteId: string;
  customerName: string;
  phone?: string;
  redirectOnDelete?: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Excluir o orçamento de "${customerName}"? Essa ação não pode ser desfeita.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/orcamentos/${quoteId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Erro ao excluir.");
        return;
      }
      if (redirectOnDelete) {
        router.push(redirectOnDelete);
      } else {
        router.refresh();
      }
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-1.5">
      {phone && (
        <a
          href={`https://wa.me/55${phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Conversar no WhatsApp"
          aria-label="Conversar no WhatsApp"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:border-[#25D366] hover:text-[#25D366]"
        >
          <MessageCircle size={15} />
        </a>
      )}
      <Link
        href={`/admin/orcamentos/${quoteId}?print=1`}
        target="_blank"
        title="Imprimir / exportar PDF"
        aria-label="Imprimir orçamento"
        className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:border-brand-dark hover:text-brand-dark"
      >
        <Printer size={15} />
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        title="Excluir orçamento"
        aria-label="Excluir orçamento"
        className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-60"
      >
        {deleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
      </button>
    </div>
  );
}
