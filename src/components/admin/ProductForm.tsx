"use client";

import { useState, useRef, FormEvent, DragEvent } from "react";
import { useRouter } from "next/navigation";
import { Brand, Category, Product } from "@/lib/types";
import { Plus, Trash2, ImageOff, UploadCloud, Loader2 } from "lucide-react";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function specsToText(product?: Product) {
  if (!product) return "";
  return product.specs.map((s) => `${s.spec_name}: ${s.spec_value}`).join("\n");
}

function variationsToText(product?: Product) {
  if (!product) return "";
  return product.variations.map((g) => `${g.name}: ${g.options.map((o) => o.value).join(", ")}`).join("\n");
}

export default function ProductForm({
  product,
  categories,
  brands,
}: {
  product?: Product;
  categories: Category[];
  brands: Brand[];
}) {
  const router = useRouter();
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>(() => {
    if (product) {
      const list = [product.main_image_url, ...product.images.filter((u) => u !== product.main_image_url)];
      return list.filter(Boolean).slice(0, 4).length > 0 ? list.filter(Boolean).slice(0, 4) : [""];
    }
    return [""];
  });
  const [uploading, setUploading] = useState<boolean[]>(() => images.map(() => false));
  const [uploadErrors, setUploadErrors] = useState<(string | null)[]>(() => images.map(() => null));
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function updateImage(i: number, value: string) {
    setImages((prev) => prev.map((v, idx) => (idx === i ? value : v)));
  }
  function addImage() {
    setImages((prev) => (prev.length < 4 ? [...prev, ""] : prev));
    setUploading((prev) => [...prev, false]);
    setUploadErrors((prev) => [...prev, null]);
  }
  function removeImage(i: number) {
    setImages((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev));
    setUploading((prev) => prev.filter((_, idx) => idx !== i));
    setUploadErrors((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function uploadFile(i: number, file: File) {
    setUploadErrors((prev) => prev.map((v, idx) => (idx === i ? null : v)));
    setUploading((prev) => prev.map((v, idx) => (idx === i ? true : v)));
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setUploadErrors((prev) => prev.map((v, idx) => (idx === i ? data.error ?? "Erro ao enviar imagem." : v)));
        return;
      }
      updateImage(i, data.url);
    } catch {
      setUploadErrors((prev) => prev.map((v, idx) => (idx === i ? "Erro ao enviar imagem." : v)));
    } finally {
      setUploading((prev) => prev.map((v, idx) => (idx === i ? false : v)));
    }
  }

  function handleDrop(i: number, e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(i, file);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!images[0]?.trim()) {
      setError("A imagem de capa (primeira imagem) é obrigatória.");
      return;
    }

    const form = new FormData(e.currentTarget);

    const specsText = String(form.get("specs_text") ?? "");
    const specs = specsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [spec_name, ...rest] = line.split(":");
        return { spec_name: (spec_name ?? "").trim(), spec_value: rest.join(":").trim() };
      })
      .filter((s) => s.spec_name && s.spec_value);

    const variationsText = String(form.get("variations_text") ?? "");
    const variations = variationsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [groupName, optionsRaw] = line.split(":");
        const options = (optionsRaw ?? "")
          .split(",")
          .map((o) => o.trim())
          .filter(Boolean)
          .map((value) => ({ value, price_delta: 0 }));
        return { name: (groupName ?? "").trim(), options };
      })
      .filter((g) => g.name && g.options.length > 0);

    const payload = {
      name,
      slug,
      short_description: String(form.get("short_description") ?? "") || null,
      description: String(form.get("description") ?? "") || null,
      category_id: String(form.get("category_id") ?? "") || null,
      brand_id: String(form.get("brand_id") ?? "") || null,
      sku: String(form.get("sku") ?? "") || null,
      price: form.get("price") ? Number(form.get("price")) : null,
      show_price: form.get("show_price") === "on",
      is_best_seller: form.get("is_best_seller") === "on",
      is_active: form.get("is_active") === "on",
      stock_status: String(form.get("stock_status") ?? "disponivel"),
      main_image_url: images[0]?.trim() ?? "",
      images: images.map((u) => u.trim()).filter(Boolean),
      specs,
      variations,
    };

    setSaving(true);
    try {
      const url = product ? `/api/admin/produtos/${product.id}` : "/api/admin/produtos";
      const method = product ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erro ao salvar produto.");
        return;
      }
      router.push("/admin/produtos");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!product) return;
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    await fetch(`/api/admin/produtos/${product.id}`, { method: "DELETE" });
    router.push("/admin/produtos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 rounded-lg border border-slate-200 bg-white p-6">
      {error && <p className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Nome do produto *</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Slug (URL) *</label>
          <input
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Categoria</label>
          <select
            name="category_id"
            defaultValue={product?.category_id ?? ""}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Marca</label>
          <select
            name="brand_id"
            defaultValue={product?.brand_id ?? ""}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">SKU</label>
          <input name="sku" defaultValue={product?.sku ?? ""} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Preço (R$)</label>
          <input
            type="number"
            step="0.01"
            name="price"
            defaultValue={product?.price ?? ""}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Status de estoque</label>
          <select
            name="stock_status"
            defaultValue={product?.stock_status ?? "disponivel"}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="disponivel">Disponível</option>
            <option value="sob_consulta">Sob consulta</option>
            <option value="indisponivel">Indisponível</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Imagens do produto <span className="font-normal text-slate-400">(1 a 4 — a primeira é a capa, obrigatória. Cole um link ou arraste/envie uma imagem do computador.)</span>
          </label>
          <div className="space-y-3">
            {images.map((url, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-2 w-14 shrink-0 text-xs font-semibold text-slate-500">
                  {i === 0 ? "Capa *" : `Imagem ${i + 1}`}
                </span>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(i, e)}
                  onClick={() => fileInputRefs.current[i]?.click()}
                  className="flex h-16 w-16 shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-slate-300 bg-white transition-colors hover:border-brand-dark"
                  title="Clique ou arraste uma imagem"
                >
                  {uploading[i] ? (
                    <Loader2 size={16} className="animate-spin text-brand-dark" />
                  ) : url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={url} alt="" className="h-full w-full object-contain" />
                  ) : (
                    <UploadCloud size={16} className="text-slate-300" />
                  )}
                </div>
                <input
                  ref={(el) => {
                    fileInputRefs.current[i] = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadFile(i, file);
                    e.target.value = "";
                  }}
                />

                <div className="flex-1">
                  <input
                    value={url}
                    onChange={(e) => updateImage(i, e.target.value)}
                    required={i === 0}
                    disabled={uploading[i]}
                    placeholder="Cole um link https://... ou arraste uma imagem ao lado"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-50"
                  />
                  {uploadErrors[i] && <p className="mt-1 text-xs font-medium text-red-600">{uploadErrors[i]}</p>}
                </div>

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="mt-2 shrink-0 rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    aria-label="Remover imagem"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {images.length < 4 && (
            <button
              type="button"
              onClick={addImage}
              className="mt-2 flex items-center gap-1.5 rounded-md border border-dashed border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-brand-dark hover:text-brand-dark"
            >
              <Plus size={14} /> Adicionar imagem
            </button>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Descrição curta</label>
          <input
            name="short_description"
            defaultValue={product?.short_description ?? ""}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Descrição completa</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={product?.description ?? ""}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Especificações técnicas <span className="font-normal text-slate-400">(uma por linha: Nome: Valor)</span>
          </label>
          <textarea
            name="specs_text"
            rows={4}
            defaultValue={specsToText(product)}
            placeholder={"Potência: 1 CV\nVazão máxima: 5.000 L/h"}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono text-xs"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Variações <span className="font-normal text-slate-400">(uma por linha: Grupo: opção1, opção2)</span>
          </label>
          <textarea
            name="variations_text"
            rows={3}
            defaultValue={variationsToText(product)}
            placeholder={"Voltagem: 110V, 220V\nCor: Azul, Cinza"}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="show_price" defaultChecked={product?.show_price ?? true} id="show_price" />
          <label htmlFor="show_price" className="text-sm text-slate-700">Exibir preço na loja</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_best_seller" defaultChecked={product?.is_best_seller ?? false} id="is_best_seller" />
          <label htmlFor="is_best_seller" className="text-sm text-slate-700">Mais vendido</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_active" defaultChecked={product?.is_active ?? true} id="is_active" />
          <label htmlFor="is_active" className="text-sm text-slate-700">Ativo na loja</label>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-brand-dark px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0b5a87] disabled:opacity-60"
        >
          {product ? "Salvar alterações" : "Criar produto"}
        </button>
        {product && (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-md border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            Excluir produto
          </button>
        )}
      </div>
    </form>
  );
}
