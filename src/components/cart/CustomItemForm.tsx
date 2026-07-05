"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CustomItemForm({ onDone }: { onDone?: () => void }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const description = String(form.get("description") ?? "").trim();
    if (!description) return;
    const quantity = Math.max(1, Number(form.get("quantity")) || 1);
    const notes = String(form.get("notes") ?? "").trim() || undefined;

    addItem({
      productId: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      productName: description,
      productSlug: "",
      productImage: "",
      quantity,
      selectedVariations: [],
      notes,
      isCustom: true,
    });

    setAdded(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => {
      setAdded(false);
      onDone?.();
    }, 1200);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3 rounded-md border border-slate-200 bg-white p-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">O que você está procurando? *</label>
        <input
          name="description"
          required
          placeholder="Ex: Bomba submersa 6 polegadas 7,5 CV trifásica"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:max-w-xs">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Quantidade</label>
          <input
            type="number"
            name="quantity"
            min={1}
            defaultValue={1}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">Detalhes (opcional)</label>
        <textarea
          name="notes"
          rows={2}
          placeholder="Marca de preferência, especificações, prazo..."
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 rounded-md bg-brand-dark px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b5a87]"
      >
        Adicionar à cotação
      </button>
      {added && (
        <p className="flex items-center gap-1.5 text-sm font-medium text-green-700">
          <CheckCircle2 size={16} /> Item adicionado!
        </p>
      )}
    </form>
  );
}
