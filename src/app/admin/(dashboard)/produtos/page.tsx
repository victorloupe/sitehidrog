import Link from "next/link";
import { Plus, Pencil, Search } from "lucide-react";
import { getAllProducts, getBrands, getCategories } from "@/lib/queries";
import { hasSupabase } from "@/lib/supabase/client";
import Pagination from "@/components/admin/Pagination";
import ProductExportButtons from "@/components/admin/ProductExportButtons";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 15;

export default async function ProdutosAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string; marca?: string; status?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const [allProducts, categories, brands] = await Promise.all([getAllProducts(), getCategories(), getBrands()]);

  const q = (sp.q ?? "").trim().toLowerCase();
  const hasFilter = Boolean(q || sp.categoria || sp.marca || sp.status);

  const filtered = allProducts.filter((p) => {
    if (q && !p.name.toLowerCase().includes(q) && !(p.sku ?? "").toLowerCase().includes(q)) return false;
    if (sp.categoria && p.category_id !== sp.categoria) return false;
    if (sp.marca && p.brand_id !== sp.marca) return false;
    if (sp.status === "ativo" && !p.is_active) return false;
    if (sp.status === "inativo" && p.is_active) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(sp.page) || 1), totalPages);
  const products = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Produtos</h1>
          <p className="text-sm text-slate-500">
            {hasFilter ? `${filtered.length} de ${allProducts.length} produto(s)` : `${allProducts.length} produto(s) cadastrado(s)`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ProductExportButtons products={filtered} categories={categories} brands={brands} />
          <Link
            href="/admin/produtos/novo"
            className="flex items-center gap-2 rounded-md bg-brand-dark px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b5a87] print:hidden"
          >
            <Plus size={16} /> Novo produto
          </Link>
        </div>
      </div>

      {!hasSupabase && (
        <div className="mb-4 rounded-lg border border-sky-300 bg-sky-50 p-3 text-sm text-brand-dark">
          Modo demonstração: esta lista mostra produtos de exemplo. Conecte o Supabase para cadastrar produtos reais.
        </div>
      )}

      <form className="mb-4 flex flex-wrap items-end gap-3 rounded-lg border border-slate-200 bg-white p-4 print:hidden">
        <div className="min-w-[200px] flex-1">
          <label className="mb-1 block text-xs font-medium text-slate-600">Buscar</label>
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              name="q"
              defaultValue={sp.q ?? ""}
              placeholder="Nome ou SKU..."
              className="w-full rounded-md border border-slate-300 py-2 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Categoria</label>
          <select name="categoria" defaultValue={sp.categoria ??