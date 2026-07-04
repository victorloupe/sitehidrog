"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartTable() {
  const { items, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-slate-600">Sua cotação está vazia.</p>
        <Link href="/" className="mt-3 inline-block text-sm font-semibold text-brand-dark hover:underline">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Produto</th>
            <th className="px-4 py-3">Variações</th>
            <th className="px-4 py-3">Quantidade</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item, index) => (
            <tr key={`${item.productId}-${index}`}>
              <td className="flex items-center gap-3 px-4 py-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.productImage} alt={item.productName} className="h-14 w-14 rounded-md object-cover" />
                <Link href={`/produto/${item.productSlug}`} className="font-medium text-slate-800 hover:text-brand-dark">
                  {item.productName}
                </Link>
              </td>
              <td className="px-4 py-3 text-slate-600">
                {item.selectedVariations.length > 0
                  ? item.selectedVariations.map((v) => `${v.grupo}: ${v.valor}`).join(", ")
                  : "—"}
              </td>
              <td className="px-4 py-3">
                <div className="flex w-fit items-center rounded-md border border-slate-300">
                  <button
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-100"
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => removeItem(index)}
                  aria-label="Remover item"
                  className="text-slate-400 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
