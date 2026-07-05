"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { SiteSettings } from "@/lib/types";

export default function ContactSettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/configuracoes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.get("phone"),
          whatsapp_number: form.get("whatsapp_number"),
          whatsapp_display: form.get("whatsapp_display"),
          email: form.get("email"),
          address: form.get("address"),
          instagram_url: form.get("instagram_url"),
          facebook_url: form.get("facebook_url"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erro ao salvar.");
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-lg border border-slate-200 bg-white p-6">
      {error && <p className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Telefone fixo</label>
        <input
          name="phone"
          defaultValue={settings.phone}
          placeholder="(17) 3216-5760"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            WhatsApp <span className="font-normal text-slate-400">(só números, com DDD e 55)</span>
          </label>
          <input
            name="whatsapp_number"
            defaultValue={settings.whatsapp_number}
            placeholder="5517981548788"
            inputMode="numeric"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            WhatsApp <span className="font-normal text-slate-400">(como aparece no site)</span>
          </label>
          <input
            name="whatsapp_display"
            defaultValue={settings.whatsapp_display}
            placeholder="(17) 98154-8788"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">E-mail</label>
        <input
          type="email"
          name="email"
          defaultValue={settings.email}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Endereço</label>
        <input
          name="address"
          defaultValue={settings.address}
          placeholder="Rua Feres Bucater, nº 1461 - São José do Rio Preto - SP"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Instagram (link)</label>
          <input
            name="instagram_url"
            defaultValue={settings.instagram_url}
            placeholder="https://instagram.com/hidrogbombas"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Facebook (link)</label>
          <input
            name="facebook_url"
            defaultValue={settings.facebook_url}
            placeholder="https://facebook.com/hidrogbombas"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-md bg-brand-dark px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0b5a87] disabled:opacity-60"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          Salvar alterações
        </button>
        {saved && (
          <p className="flex items-center gap-1.5 text-sm font-medium text-green-700">
            <CheckCircle2 size={16} /> Salvo!
          </p>
        )}
      </div>
    </form>
  );
}
