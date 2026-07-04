import { Brand } from "@/lib/types";

export default function BrandStrip({ brands }: { brands: Brand[] }) {
  return (
    <section className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">Marcas que trabalhamos</h2>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          {brands.map((brand) => (
            <span
              key={brand.id}
              className="stagger-item rounded-md border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:text-brand-dark hover:shadow-md"
            >
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
