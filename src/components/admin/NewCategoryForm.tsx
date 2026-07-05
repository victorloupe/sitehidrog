"use client";

import { useRef, useState, FormEvent, DragEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, UploadCloud } from "lucide-react";

function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function NewCategoryForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function uploadFile(file: File) {
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error ?? "Erro ao enviar imagem.");
        return;
      }
      setImageUrl(data.url);
    } catch {
      setUploadError("Erro ao enviar imagem.");
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/admin/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug: slugify(name),
          image_url: imageUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      setName("");
      setImageUrl("");
      (e.target as HTMLFormElement).reset();
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-slate-200 bg-white p-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">Nome da categoria</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex items-start gap-2">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-slate-300 bg-white transition-colors hover:border-brand-dark"
          title="Clique ou arraste uma imagem"
        >
          {uploading ? (
            <Loader2 size={14} className="animate-spin text-brand-dark" />
          ) : imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <UploadCloud size={14} className="text-slate-300" />
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
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Imagem (envie um arquivo ou cole um link)</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={uploading}
            placeholder="https://..."
            className="rounded-md border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-50"
          />
          {uploadError && <p className="mt-1 text-xs font-medium text-red-600">{uploadError}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={saving || uploading}
        className="rounded-md bg-brand-dark px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b5a87] disabled:opacity-60"
      >
        Adicionar categoria
      </button>
      {error && <p className="w-full text-sm font-medium text-red-600">{error}</p>}
    </form>
  );
}
