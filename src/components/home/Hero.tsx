import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto aspect-[1227/759] w-full max-w-7xl sm:aspect-[2073/759]">
        {/* Imagem própria para o mobile (sem texto embutido, com espaço à
            esquerda pra sobrepor o título) e a original a partir do sm. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/BannerSiteMobile.png"
          alt="HidroG - A força que move sua fazenda. Bombas Leão: eficiência, resistência e confiança para o seu abastecimento de água."
          className="absolute inset-0 h-full w-full animate-fade-in object-cover sm:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/BannerSite.png"
          alt="HidroG - A força que move sua fazenda. Bombas Leão: eficiência, resistência e confiança para o seu abastecimento de água."
          className="absolute inset-0 hidden h-full w-full animate-fade-in object-cover sm:block"
        />
        {/* Sombra da esquerda pra direita (onde fica o texto), pra garantir
            contraste independente do que estiver atrás na imagem. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
        {/* Reforço extra no rodapé só no mobile, por causa dos botões. */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent sm:hidden" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-4 sm:pb-8 md:pb-10">
          <div className="max-w-lg animate-fade-in-up text-white">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-brand drop-shadow-md sm:text-sm">
              Materiais para poços artesianos
            </p>
            <h1 className="text-xl font-bold leading-tight drop-shadow-md sm:text-2xl md:text-4xl">
              Bombas submersas, painéis, cabos PP e conexões para o seu poço artesiano
            </h1>
            <p className="mt-2 max-w-md text-sm text-wh