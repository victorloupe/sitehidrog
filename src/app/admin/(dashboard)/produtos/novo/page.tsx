import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBrands, getCategories } from "@/lib/queries";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";


export default async function NovoProdutoPage() {
  const [categories, brands] = await Promise.all([getCategories(), getBrands()]);
  return (
    <div>
      <Link href="/admin/produtos" className="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-brand-dark">
        <ArrowLeft size={16} /> Voltar
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Novo produto</h1>
      <ProductForm categories={categories} brands={brands} />
    </div>
  );
}
