import Link from "next/link";
import { getQuotes } from "@/lib/admin-data";

export const dynamic = "force-dynamic";


const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  novo: { label: "Novo", className: "bg-sky-100 text-brand-dark" },
  em_andamento: { label: "Em andamento", className: "bg-blue-100 text-blue-700" },
  respondido: { label: "Respondido", className: "bg-purple-100 text-purple-700" },
  finalizado: { label: "Finalizado", className: "bg-green-100 text-green-700" },
};

export default async function OrcamentosPage() {
  const quotes = await getQuotes();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Orçamentos</h1>
      <p className="mb-6 text-sm text-slate-500">{quotes.length} pedido(s) de cotação recebido(s)</p>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Cidade/UF</th>
              <th className="px-4 py-3">Itens</th>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quotes.map((q) => {
              const status = STATUS_LABELS[q.status] ?? STATUS_LABELS.novo;
              return (
                <tr key={q.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/orcamentos/${q.id}`} className="font-medium text-slate-800 hover:text-brand-dark">
                      {q.customer_name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {q.address_city}/{q.address_state}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{q.items.length}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(q.created_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {quotes.length === 0 && <p className="p-6 text-center text-sm text-slate-500">Nenhum orçamento ainda.</p>}
      </div>
    </div>
  );
}
