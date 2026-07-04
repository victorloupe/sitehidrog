import { notFound } from "next/navigation";
import { getCategories, getProductsByCategorySlug } from "@/lib/queries";
import ProductCard from "@/components/ui/ProductCard";

export const dynamic = "force-dynamic";


export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = await getProductsByCategorySlug(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">{category.name}</h1>
      <p className="mb-6 text-sm text-slate-500">{products.length} produto(s) encontrado(s)</p>

      {products.length === 0 ? (
        <p className="text-slate-500">Nenhum produto cadastrado nesta categoria ainda.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
