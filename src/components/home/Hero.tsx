import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto aspect-[2073/759] w-full max-w-7xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/BannerSite.png"
          alt="HidroG - A força que move sua fazenda. Bombas Leão: eficiência, resistência e confiança para o seu abastecimento de água."
          className="absolute inset-0 h-full w-full animate-fade-in object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-5 sm:pb-8 md:pb-10">
          <div className="max-w-lg animate-fade-in-up text-white">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-brand-gray drop-shadow-md sm:text-sm">
              Materiais para poços artesianos
            </p>
            <h1 className="text-xl font-bold leading-tight drop-shadow-md sm:text-2xl md:text-4xl">
              Bombas submersas, painéis, cabos PP e conexões para o seu poço artesiano
            </h1>
            <p className="mt-2 hidden max-w-md text-sm text-white/90 drop-shadow-md sm:mt-3 sm:block md:text-base">
              Monte sua lista de produtos, envie seus dados e nossa equipe retorna com o melhor orçamento — sem
              compromisso.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
              <Link
                href="#mais-vendidos"
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-dark transition-all hover:bg-sky-50 hover:shadow-lg active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
              >
                Ver mais vendidos
              </Link>
              <Link
                href="/carrinho"
                className="rounded-full border border-white/60 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-white/10 active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
              >
                Minha cotação
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
