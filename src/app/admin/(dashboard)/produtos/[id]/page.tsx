import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllProducts, getBrands, getCategories } from "@/lib/queries";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";


export default async function EditarProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [products, categories, brands] = await Promise.all([getAllProducts(), getCategories(), getBrands()]);
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <div>
      <Link href="/admin/produtos" className="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-brand-dark">
        <ArrowLeft size={16} /> Voltar
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Editar produto</h1>
      <ProductForm product={product} categories={categories} brands={brands} />
    </div>
  );
}
