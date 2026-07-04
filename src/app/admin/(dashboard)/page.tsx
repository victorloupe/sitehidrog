import Link from "next/link";
import { FileText, Package, Tags, Award } from "lucide-react";
import { getAllProducts, getBrands, getCategories } from "@/lib/queries";
import { getQuotes } from "@/lib/admin-data";
import { hasSupabase } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";


export default async function AdminDashboardPage() {
  const [products, categories, brands, quotes] = await Promise.all([
    getAllProducts(),
    getCategories(),
    getBrands(),
    getQuotes(),
  ]);

  const newQuotes = quotes.filter((q) => q.status === "novo").length;

  const cards = [
    { label: "Orçamentos novos", value: newQuotes, icon: FileText, href: "/admin/orcamentos", color: "bg-brand-dark" },
    { label: "Produtos ativos", value: products.length, icon: Package, href: "/admin/produtos", color: "bg-brand-dark" },
    { label: "Categorias", value: categories.length, icon: Tags, href: "/admin/categorias", color: "bg-emerald-600" },
    { label: "Marcas", value: brands.length, icon: Award, href: "/admin/marcas", color: "bg-purple-600" },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mb-6 text-sm text-slate-500">Visão geral da sua loja</p>

      {!hasSupabase && (
        <div className="mb-6 rounded-lg border border-sky-300 bg-sky-50 p-4 text-sm text-brand-dark">
          <strong>Modo demonstração:</strong> o Supabase ainda não está conectado. O catálogo abaixo usa dados de
          exemplo e os orçamentos são salvos localmente em <code>.data/quotes-dev.json</code>. Configure{" "}
          <code>NEXT_PUBLIC_SUPABASE_URL</code> e <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> no arquivo{" "}
          <code>.env.local</code> para usar o banco de dados real (veja <code>schema.sql</code> e{" "}
          <code>README.md</code>).
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-md ${color} text-white`}>
              <Icon size={20} />
            </div>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="mb-4 font-semibold text-slate-800">Últimos orçamentos</h2>
        {quotes.length === 0 ? (
          <p className="text-sm text-slate-500">Nenhum orçamento recebido ainda.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {quotes.slice(0, 5).map((q) => (
              <li key={q.id} className="flex items-center justify-between py-2.5 text-sm">
                <div>
                  <Link href={`/admin/orcamentos/${q.id}`} className="font-medium text-slate-800 hover:text-brand-dark">
                    {q.customer_name}
                  </Link>
                  <span className="ml-2 text-slate-400">
                    {q.address_city}/{q.address_state}
                  </span>
                </div>
                <span className="text-xs text-slate-400">{new Date(q.created_at).toLocaleDateString("pt-BR")}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
