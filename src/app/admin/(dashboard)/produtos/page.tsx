import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllProducts, getBrands, getCategories } from "@/lib/queries";
import { hasSupabase } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";


export default async function ProdutosAdminPage() {
  const [products, categories, brands] = await Promise.all([getAllProducts(), getCategories(), getBrands()]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Produtos</h1>
          <p className="text-sm text-slate-500">{products.length} produto(s) cadastrado(s)</p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="flex items-center gap-2 rounded-md bg-brand-dark px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b5a87]"
        >
          <Plus size={16} /> Novo produto
        </Link>
      </div>

      {!hasSupabase && (
        <div className="mb-4 rounded-lg border border-sky-300 bg-sky-50 p-3 text-sm text-brand-dark">
          Modo demonstração: esta lista mostra produtos de exemplo. Conecte o Supabase para cadastrar produtos reais.
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Marca</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
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
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/produtos/${p.id}`} className="text-slate-400 hover:text-brand-dark">
                    <Pencil size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
