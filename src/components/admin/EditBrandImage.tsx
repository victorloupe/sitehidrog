"use client";

import { useRef, useState, DragEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, UploadCloud, Check } from "lucide-react";
import { Brand } from "@/lib/types";

export default function EditBrandImage({ brand }: { brand: Brand }) {
  const router = useRouter();
  const [logoUrl, setLogoUrl] = useState(brand.logo_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dirty = logoUrl !== (brand.logo_url ?? "");

  async function uploadFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erro ao enviar imagem.");
        return;
      }
      setLogoUrl(data.url);
    } catch {
      setError("Erro ao enviar imagem.");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/marcas/${brand.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logo_url: logoUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erro ao salvar logo.");
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-start gap-2">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-slate-300 bg-white transition-colors hover:border-brand-dark"
        title="Clique ou arraste uma imagem (fundo branco, quadrada)"
      >
        {uploading ? (
          <Loader2 size={16} className="animate-spin text-brand-dark" />
        ) : logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoUrl} alt="" className="h-full w-full object-contain p-1" />
        ) : (
          <UploadCloud size={16} className="text-slate-300" />
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
          e.target.value = "";
        }}
      />

      <div className="min-w-0 flex-1">
        <input
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          disabled={uploading}
          placeholder="Cole um link https://... ou clique no quadrado para enviar"
          className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-xs disabled:bg-slate-50"
        />
        {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
        {dirty && !error && (
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || uploading}
            className="mt-1 flex items-center gap-1 rounded-md bg-brand-dark px-2 py-1 text-xs font-semibold text-white hover:bg-[#0b5a87] disabled:opacity-60"
          >
            {saving && <Loader2 size={12} className="animate-spin" />}
            Salvar logo
          </button>
        )}
        {saved && (
          <p className="mt-1 flex items-center gap-1 text-xs font-medium text-green-700">
            <Check size={12} /> Logo salva!
          </p>
        )}
      </div>
    </div>
  );
}
