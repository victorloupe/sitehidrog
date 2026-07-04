"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteEntityButton({ endpoint, confirmMessage }: { endpoint: string; confirmMessage: string }) {
  const router = useRouter();
  async function handleDelete() {
    if (!confirm(confirmMessage)) return;
    const res = await fetch(endpoint, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Erro ao excluir.");
      return;
    }
    router.refresh();
  }
  return (
    <button onClick={handleDelete} className="text-slate-400 hover:text-red-600" aria-label="Excluir">
      <Trash2 size={16} />
    </button>
  );
}
