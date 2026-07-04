"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function NewBrandForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/marcas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug: slugify(name),
          logo_url: String(form.get("logo_url") ?? ""),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      setName("");
      (e.target as HTMLFormElement).reset();
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-slate-200 bg-white p-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">Nome da marca</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">URL do logo</label>
        <input name="logo_url" placeholder="https://..." className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
      </div>
      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-brand-dark px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b5a87] disabled:opacity-60"
      >
        Adicionar marca
      </button>
      {error && <p className="w-full text-sm font-medium text-red-600">{error}</p>}
    </form>
  );
}
