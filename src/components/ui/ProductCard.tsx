import Link from "next/link";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produto/${product.slug}`}
      className="stagger-item group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl"
    >
      <div className="aspect-square w-full overflow-hidden bg-white p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.main_image_url}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        {product.is_best_seller && (
          <span className="mb-1 w-fit rounded bg-sky-100 px-2 py-0.5 text-[11px] font-semibold text-brand-dark">
            Mais vendido
          </span>
        )}
        <h3 className="line-clamp-2 text-sm font-medium text-slate-800 transition-colors group-hover:text-brand-dark">
          {product.name}
        </h3>
        {(product.short_description || product.description) && (
          <p className="mt-1 line-clamp-2 text-xs text-slate-500">
            {product.short_description || (product.description ? product.description.replace(/<[^>]*>/g, "").trim() : "")}
          </p>
        )}
        <div className="mt-auto pt-3">
          {product.show_price && product.price ? (
            <p className="text-lg font-bold text-brand-dark">
              {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          ) : (
            <p className="text-sm font-semibold text-slate-600">Consulte o preço</p>
          )}
          <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand transition-transform group-hover:translate-x-0.5">
            Ver detalhes →
          </span>
        </div>
      </div>
    </Link>
  );
}
