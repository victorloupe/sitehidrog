"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product, SelectedVariation } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { CheckCircle2 } from "lucide-react";

export default function AddToQuoteForm({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variations.forEach((g) => {
      if (g.options.length > 0) initial[g.name] = g.options[0].value;
    });
    return initial;
  });
  const [added, setAdded] = useState(false);

  function handleAdd() {
    const selectedVariations: SelectedVariation[] = Object.entries(selected).map(([grupo, valor]) => ({
      grupo,
      valor,
    }));

    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: product.main_image_url,
      quantity,
      selectedVariations,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="space-y-5">
      {product.variations.map((group) => (
        <div key={group.id}>
          <label className="mb-2 block text-sm font-semibold text-slate-700">{group.name}</label>
          <div className="flex flex-wrap gap-2">
            {group.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelected((prev) => ({ ...prev, [group.name]: opt.value }))}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                  selected[group.name] === opt.value
                    ? "border-brand-dark bg-brand-dark text-white"
                    : "border-slate-300 text-slate-700 hover:border-brand-dark"
                }`}
              >
                {opt.value}
                {opt.price_delta > 0 && ` (+R$ ${opt.price_delta.toFixed(2)})`}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Quantidade</label>
        <div className="flex w-fit items-center rounded-md border border-slate-300">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Diminuir quantidade"
            className="px-3 py-1.5 text-lg font-medium text-slate-600 hover:bg-slate-100"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-semibold" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Aumentar quantidade"
            className="px-3 py-1.5 text-lg font-medium text-slate-600 hover:bg-slate-100"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={handleAdd}
          disabled={product.stock_status === "indisponivel"}
          className="flex-1 rounded-md bg-brand-dark px-6 py-3 text-sm font-semibold text-white hover:bg-[#0b5a87] transition-colors disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {product.stock_status === "indisponivel" ? "Indisponível" : "Adicionar à cotação"}
        </button>
        <button
          type="button"
          onClick={() => {
            handleAdd();
            router.push("/carrinho");
          }}
          className="flex-1 rounded-md border border-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark hover:bg-sky-50 transition-colors"
        >
          Adicionar e ver cotação
        </button>
      </div>

      {added && (
        <p className="flex items-center gap-2 text-sm font-mediu