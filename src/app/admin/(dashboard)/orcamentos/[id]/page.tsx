import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { getQuoteById } from "@/lib/admin-data";
import QuoteStatusSelect from "@/components/admin/QuoteStatusSelect";
import AutoPrint from "@/components/admin/AutoPrint";
import QuoteActions from "@/components/admin/QuoteActions";

export const dynamic = "force-dynamic";


export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = await getQuoteById(id);
  if (!quote) notFound();

  return (
    <div>
      <AutoPrint />

      <Link href="/admin/orcamentos" className="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-brand-dark print:hidden">
        <ArrowLeft size={16} /> Voltar
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Orçamento de {quote.customer_name}</h1>
        <div className="flex items-center gap-3 print:hidden">
          <QuoteActions
            quoteId={quote.id}
            customerName={quote.customer_name}
            phone={quote.phone ?? undefined}
            redirectOnDelete="/admin/orcamentos"
          />
          <QuoteStatusSelect quoteId={quote.id} initialStatus={quote.status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="mb-3 font-semibold text-slate-800">Itens solicitados</h2>
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-2">Produto</th>
                  <th className="py-2">Variações</th>
                  <th className="py-2">Qtd.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quote.items.map((item, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-medium text-slate-800">{item.productName}</td>
                    <td className="py-2.5 text-slate-600">
                      {item.selectedVariations.length > 0
                        ? item.selectedVariations.map((v) => `${v.grupo}: ${v.valor}`).join(", ")
                        : "—"}
                    </td>
                    <td className="py-2.5 text-slate-600">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {quote.notes && (
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="mb-2 font-semibold text-slate-800">Observações do cliente</h2>
              <p className="text-sm text-slate-600">{quote.notes}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="mb-3 font-semibold text-slate-800">Dados do cliente</h2>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-slate-400">Nome</dt>
                <dd className="font-medium text-slate-800">{quote.customer_name}</dd>
              </div>
              {quote.document_number && (
                <div>
                  <dt className="text-slate-400">{quote.document_type === "cnpj" ? "CNPJ" : "CPF"}</dt>
                  <dd className="text-slate-700">{quote.document_number}</dd>
                </div>
              )}
              {quote.email && (
                <div>
                  <dt className="text-slate-400">E-mail</dt>
                  <dd className="text-slate-700">{quote.email}</dd>
                </div>
              )}
              {quote.phone && (
                <div>
                  <dt className="text-slate-400">Telefone</dt>
                  <dd className="text-slate-700">{quote.phone}</dd>
                </div>
              )}
            </dl>

            {quote.phone && (
              <a
                href={`https://wa.me/55${quote.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                  `Olá, ${quote.customer_name}! Recebemos seu pedido de cotação na HidroG e já estamos preparando o orçamento.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5a] print:hidden"
              >
                <MessageCircle size={16} /> Conversar no WhatsApp
              </a>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="mb-3 font-semibold text-slate-800">Endereço</h2>
            <p className="text-sm text-slate-700">
              {quote.address_street}
              {quote.address_number ? `, ${quote.address_number}` : ""}
              {quote.address_complement ? ` - ${quote.address_complement}` : ""}
              <br />
              {quote.address_neighborhood && `${quote.address_neighborhood} - `}
              {quote.address_city}/{quote.address_state}
              <br />
              {quote.address_zip && `CEP ${quote.address_zip}`}
            </p>
          </div>

          <p className="text-xs text-slate-400">
            Recebido em {new Date(quote.created_at).toLocaleString("pt-BR")}
          </p>
        </div>
      </div>
    </div>
  );
}
