import { getAllProducts } from "@/lib/queries";
import ProductCard from "@/components/ui/ProductCard";

export const dynamic = "force-dynamic";


export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const all = await getAllProducts();
  const term = q.trim().toLowerCase();
  const results = term
    ? all.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          (p.short_description ?? "").toLowerCase().includes(term) ||
          (p.sku ?? "").toLowerCase().includes(term)
      )
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Resultados para &quot;{q}&quot;</h1>
      <p className="mb-6 text-sm text-slate-500">{results.length} produto(s) encontrado(s)</p>

      {results.length === 0 ? (
        <p className="text-slate-500">Nenhum produto encontrado. Tente outro termo de busca.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
