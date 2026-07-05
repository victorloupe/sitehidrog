import { Product } from "@/lib/types";
import ProductCard from "@/components/ui/ProductCard";

export default function BestSellers({ products }: { products: Product[] }) {
  return (
    <section id="mais-vendidos" className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">Mais vendidos</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>