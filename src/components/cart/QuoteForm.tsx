"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { BR_STATES } from "@/lib/br-states";
import { CheckCircle2, Loader2 } from "lucide-react";
import { maskDocument, maskPhone } from "@/lib/masks";
import { trackQuoteConversion } from "@/lib/gtag";

export default function QuoteForm() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [documentValue, setDocumentValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    if (items.length === 0) {
      setErrorMsg("Adicione ao menos um produto antes de enviar a cotação.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    const documentDigits = String(data.get("document_number") ?? "").replace(/\D/g, "");
    const documentType = documentDigits.length > 11 ? "cnpj" : documentDigits.length > 0 ? "cpf" : undefined;

    const payload = {
      customer_name: String(data.get("customer_name") ?? "").trim(),
      document_number: documentDigits || undefined,
      document_type: documentType,
      email: String(data.get("email") ?? "").trim() || undefined,
      phone: String(data.get("phone") ?? "").trim() || undefined,
      address_zip: String(data.get("address_zip") ?? "").trim() || undefined,
      address_street: String(data.get("address_street") ?? "").trim(),
      address_number: String(data.get("address_number") ?? "").trim() || undefined,
      address_complement: String(data.get("address_complement") ?? "").trim() || undefined,
      address_neighborhood: String(data.get("address_neighborhood") ?? "").trim() || undefined,
      address_city: String(data.get("address_city") ?? "").trim(),
      address_state: String(data.get("address_state") ?? "").trim(),
      notes: String(data.get("notes") ?? "").trim() || undefined,
      items,
    };

    if (!payload.customer_name || !payload.address_street || !payload.address_city || !payload.address_state) {
      setErrorMsg("Preencha os campos obrigatórios: nome, endereço, cidade e estado.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Falha ao enviar cotação");

      trackQuoteConversion();
      setSuccess(true);
      clearCart();
      setTimeout(() => router.push("/"), 3000);
    } catch {
      setErrorMsg("Não foi possível enviar sua cotação agora. Tente novamente em instantes.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-3 text-green-600" size={40} />
        <h2 className="text-lg font-bold text-green-800">Cotação enviada com sucesso!</h2>
        <p className="mt-1 text-sm text-green-700">
          Recebemos seus dados e em breve nossa equipe entrará em contato com o orçamento.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-slate-200 bg-white p-6">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Seus dados</h2>
        <p className="text-sm text-slate-500">Campos marcados com * são obrigatórios.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Nome completo / Razão social *</label>
          <input
            name="customer_name"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">CPF ou CNPJ</label>
          <input
            name="document_number"
            value={documentValue}
            onChange={(e) => setDocumentValue(maskDocument(e.target.value))}
            inputMode="numeric"
            placeholder="000.000.000-00"
            maxLength={18}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Telefone / WhatsApp</label>
          <input
            name="phone"
            value={phoneValue}
            onChange={(e) => setPhoneValue(maskPhone(e.target.value))}
            inputMode="numeric"
            placeholder="(00) 00000-0000"
            maxLength={15}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">E-mail</label>
          <input
            type="email"
            name="email"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-800">Endereço de entrega</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">CEP</label>
          <input
            name="address_zip"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="sm:col-span-4">
          <label className="mb-1 block text-sm font-medium text-slate-700">Rua / Avenida *</label>
          <input
            name="address_street"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Número</label>
          <input
            name="address_number"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Complemento</label>
          <input
            name="address_complement"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Bairro</label>
          <input
            name="address_neighborhood"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="sm:col-span-3">
          <label className="mb-1 block text-sm font-medium text-slate-700">Cidade *</label>
          <input
            name="address_city"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="sm:col-span-3">
          <label className="mb-1 block text-sm font-medium text-slate-700">Estado *</label>
          <select
            name="address_state"
            required
            defaultValue=""
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="" disabled>Selecione</option>
            {BR_STATES.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Observações</label>
        <textarea
          name="notes"
          rows={3}
          placeholder="Prazo desejado, condições de pagamento, dúvidas..."
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      {errorMsg && <p className="text-sm font-medium text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-dark px-6 py-3 text-sm font-semibold text-white hover:bg-[#0b5a87] transition-colors disabled:opacity-60"
      >
        {submitting && <Loader2 size={16} className="animate-spin" />}
        Enviar pedido de cotação
      </button>
    </form>
  );
}
