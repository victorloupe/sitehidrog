import Link from "next/link";
import { Category } from "@/lib/types";

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">Compre por categoria</h2>
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-7">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className="stagger-item group flex flex-col items-center rounded-lg border border-slate-200 bg-white p-2 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg sm:p-3"
          >
            <div className="mb-1.5 h-12 w-12 overflow-hidden rounded-full bg-slate-100 ring-2 ring-transparent transition-all group-hover:ring-brand/30 sm:mb-2 sm:h-20 sm:w-20">
              {cat.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cat.image_url}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              )}
            </div>
            <span className="text-[11px] font-medium leading-tight text-slate-700 group-hover:text-brand-dark sm:text-xs">
 