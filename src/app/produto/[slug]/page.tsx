import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBrands, getCategories, getProductBySlug, getRelatedProducts } from "@/lib/queries";
import Gallery from "@/components/product/Gallery";
import SpecsTable from "@/components/product/SpecsTable";
import AddToQuoteForm from "@/components/product/AddToQuoteForm";
import RelatedProducts from "@/components/product/RelatedProducts";

// ISR: a página é gerada estaticamente e revalidada a cada 60s, em vez de
// buscar no banco a cada request (force-dynamic anterior deixava toda
// visita mais lenta e sem cache).
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const description =
    product.short_description || product.description || "Confira este produto HidroG e monte sua cotação.";

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: product.main_image_url ? [{ url: product.main_image_url }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [categories, brands, related] = await Promise.all([
    getCategories(),
    getBrands(),
    getRelatedProducts(product, 4),
  ]);

  const category = categories.find((c) => c.id === product.category_id);
  const brand = brands.find((b) => b.id === product.brand_id);

  const stockLabel = {
    disponivel: { text: "Disponível", className: "bg-green-100 text-green-700" },
    sob_consulta: { text: "Sob consulta", className: "bg-sky-100 text-brand-dark" },
    indisponivel: { text: "Indisponível", className: "bg-red-100 text-red-700" },
  }[product.stock_status];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-slate-500">
        <Link href="/" className="hover:text-brand-dark">Home</Link>
        <span>/</span>
        {category && (
          <>
            <Link href={`/categoria/${category.slug}`} className="hover:text-brand-dark">
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-700">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <Gallery images={product.images} alt={product.name} />

        <div>
          {brand && <p className="mb-1 text-sm font-semibold text-brand-dark">{brand.name}</p>}
          <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>
          {product.sku && <p className="mt-1 text-xs text-slate-400">SKU: {product.sku}</p>}

          <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${stockLabel.className}`}>
            {stockLabel.text}
          </span>

          {product.short_description && (
            <p className="mt-4 text-slate-600">{product.short_description}</p>
          )}

          {product.show_price && product.price ? (
            <p className="mt-4 text-3xl font-bold text-brand-dark">
              {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          ) : (
            <p className="mt-4 text-lg font-semib