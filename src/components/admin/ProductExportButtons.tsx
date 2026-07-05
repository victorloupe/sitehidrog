"use client";

import { FileSpreadsheet, Printer } from "lucide-react";
import { Brand, Category, Product } from "@/lib/types";

function csvCell(value: string | number | null | undefined) {
  const s = String(value ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export default function ProductExportButtons({
  products,
  categories,
  brands,
}: {
  products: Product[];
  categories: Category[];
  brands: Brand[];
}) {
  function exportExcel() {
    const header = ["Nome", "SKU", "Categoria", "Marca", "Preço", "Status"];
    const rows = products.map((p) => [
      p.name,
      p.sku ?? "",
      categories.find((c) => c.id === p.category_id)?.name ?? "",
      brands.find((b) => b.id === p.brand_id)?.name ?? "",
      p.price ?? "",
      p.is_active ? "Ativo" : "Inativo",
    ]);
    const csv = [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
    // BOM no início para o Excel abrir os acentos corretamente.
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "produtos.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex gap-2 print:hidden">
      <button
        type="button"
        onClick={exportExcel}
        title="Exportar Excel"
        aria-label="Exportar Excel"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 transition-colors hover:border-green-600 hover:text-green-700"
      >
        <FileSpreadsheet size={16} />
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        title="Exportar PDF (imprimir)"
        aria-label="Exportar PDF"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 transition-colors hover:border-brand-dark hover:text-brand-dark"
      >
        <Printer size={16} />
      </button>
    </div>
  );
}
