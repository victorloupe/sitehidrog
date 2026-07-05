import { Brand } from "@/lib/types";

export default function BrandStrip({ brands }: { brands: Brand[] }) {
  if (brands.length === 0) return null;

  // Duplica a lista para o carrossel dar a volta sem "pulo" perceptível.
  const track = [...brands, ...brands];

  return (
    <section className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">Marcas que trabalhamos</h2>
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-6">
            {track.map((brand, i) => (
              <div
                key={`${brand.id}-${i}`}
                title={brand.name}
                className="flex h-20 w-20 shrink-0 items-center justify-center bg-white p-2.5 transition-transform duration-300 hover:-translate-y-0.5 sm:h-24 sm:w-24"
              >
                {brand.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={brand.logo_url} alt={brand.name} className="h-full w-full object-contain" />
                ) : (
                  <span className="text-center text-xs font-semibold leading-tight text-slate-400">{brand.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
