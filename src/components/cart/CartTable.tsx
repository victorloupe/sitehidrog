"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Trash2, PackageSearch, PackagePlus, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CustomItemForm from "./CustomItemForm";

export default function CartTable({ whatsappNumber }: { whatsappNumber: string }) {
  const { items, removeItem, updateQuantity } = useCart();
  const searchParams = useSearchParams();
  // Permite que links de fora (ex: home) já cheguem com o formulário de
  // item personalizado aberto, via /carrinho?custom=1.
  const [showCustomForm, setShowCustomForm] = useState(searchParams.get("custom") === "1");

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Olá! Não encontrei no site o produto que eu procurava, vocês podem me ajudar?"
  )}`;

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-600">Sua cotação está vazia.</p>
          <Link href="/" className="mt-3 inline-block text-sm font-semibold text-brand-dark hover:underline">
            Voltar para a loja
          </Link>
        </div>
      ) : (
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
                    {item.isCustom ? (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-400">
                        <PackageSearch size={20} />
                      </div>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.productImage} alt={item.productName} className="h-14 w-14 rounded-md object-cover" />
                    )}
                    <div>
                      {item.isCustom ? (
                        <span className="font-medium text-slate-800">{item.productName}</span>
                      ) : (
                        <Link href={`/produto/${item.productSlug}`} className="font-medium text-slate-800 hover:text-brand-dark">
                          {item.productName}
                        </Link>
                      )}
                      {item.isCustom && (
                        <span className="ml-2 inline-block rounded-full bg-sky-100 px-2 py-0.5 text-[10