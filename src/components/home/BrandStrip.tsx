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
                className="flex h-20 w-20 shrink-0 items-center justify-center bg-white p-2.5 transition-transform du