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
          <select name="categoria" defaultValue={sp.categoria ?? ""} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
            <option value="">Todas</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Marca</label>
          <select name="marca" defaultValue={sp.marca ?? ""} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
            <option value="">Todas</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Status</label>
          <select name="status" defaultValue={sp.status ?? ""} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
            <option value="">Todos</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>
        <button type="submit" className="rounded-md bg-brand-dark px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b5a87]">
          Filtrar
        </button>
        {hasFilter && (
          <Link href="/admin/produtos" className="text-sm font-medium text-slate-500 hover:text-brand-dark">
            Limpar filtros
          </Link>
        )}
      </form>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Marca</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 print:hidden"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="flex items-center gap-3 px-4 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.main_image_url} alt={p.name} className="h-10 w-10 rounded object-cover" />
                  <span className="font-medium text-slate-800">{p.name}</span>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {categories.find((c) => c.id === p.category_id)?.name ?? "—"}
                </td>
                <td className="px-4 py-3 text-slate-600">{brands.find((b) => b.id === p.brand_id)?.name ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">
                  {p.price ? p.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      p.is_active ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {p.is_active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right print:hidden">
                  <Link href={`/admin/produtos/${p.id}`} className="text-slate-400 hover:text-brand-dark">
                    <Pencil size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p className="p-6 text-center text-sm text-slate-500">Nenhum produto encontrado.</p>}
        <Pagination page={page} totalPages={totalPages} searchParams={sp} />
      </div>
    </div>
  );
}
