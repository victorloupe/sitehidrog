import Link from "next/link";
import { Search } from "lucide-react";
import { getQuotes } from "@/lib/admin-data";
import Pagination from "@/components/admin/Pagination";
import QuoteActions from "@/components/admin/QuoteActions";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 15;

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  novo: { label: "Novo", className: "bg-sky-100 text-brand-dark" },
  em_andamento: { label: "Em andamento", className: "bg-blue-100 text-blue-700" },
  respondido: { label: "Respondido", className: "bg-purple-100 text-purple-700" },
  finalizado: { label: "Finalizado", className: "bg-green-100 text-green-700" },
};

export default async function OrcamentosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const allQuotes = await getQuotes();

  const q = (sp.q ?? "").trim().toLowerCase();
  const hasFilter = Boolean(q || sp.status);

  const filtered = allQuotes.filter((quote) => {
    if (
      q &&
      !quote.customer_name.toLowerCase().includes(q) &&
      !(quote.address_city ?? "").toLowerCase().includes(q)
    )
      return false;
    if (sp.status && quote.status !== sp.status) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(sp.page) || 1), totalPages);
  const quotes = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Orçamentos</h1>
      <p className="mb-6 text-sm text-slate-500">
        {hasFilter ? `${filtered.length} de ${allQuotes.length} pedido(s)` : `${allQuotes.length} pedido(s) de cotação recebido(s)`}
      </p>

      <form className="mb-4 flex flex-wrap items-end gap-3 rounded-lg border border-slate-200 bg-white p-4">
        <div className="min-w-[220px] flex-1">
          <label className="mb-1 block text-xs font-medium text-slate-600">Buscar</label>
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              name="q"
              defaultValue={sp.q ?? ""}
              placeholder="Cliente ou cidade..."
              className="w-full rounded-md border border-slate-300 py-2 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Status</label>
          <select name="status" defaultValue={sp.status ?? ""} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
            <option value="">Todos</option>
            <option value="novo">Novo</option>
            <option value="em_andamento">Em andamento</option>
            <option value="respondido">Respondido</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>
        <button type="submit" className="rounded-md bg-brand-dark px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b5a87]">
          Filtrar
        </button>
        {hasFilter && (
          <Link href="/admin/orcamentos" className="text-sm font-medium text-slate-500 hover:text-brand-dark">
            Limpar filtros
          </Link>
        )}
      </form>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Cidade/UF</th>
              <th className="px-4 py-3">Itens</th>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quotes.map((quote) => {
              const status = STATUS_LABELS[quote.status] ?? STATUS_LABELS.novo;
              return (
                <tr key={quote.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/orcamentos/${quote.id}`} className="font-medium text-slate-800 hover:text-brand-dark">
                      {quote.customer_name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {quote.address_city}/{quote.address_state}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{quote.items.length}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(quote.created_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <QuoteActions quoteId={quote.id} customerName={quote.customer_name} phone={quote.phone} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {quotes.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-500">
            {hasFilter ? "Nenhum orçamento encontrado com esses filtros." : "Nenhum orçamento ainda."}
          </p>
        )}
        <Pagination page={page} totalPages={totalPages} searchParams={sp} />
      </div>
    </div>
  );
}
