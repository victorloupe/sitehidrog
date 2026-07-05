// Renderiza a descrição do produto preservando quebras de linha e
// transformando linhas que começam com "--" em títulos de seção — o
// mesmo padrão de texto usado no site antigo (ex: "--APLICAÇÕES GERAIS",
// "--DETALHES DO PRODUTO", "--OBSERVAÇÕES"). Assim dá pra colar a
// descrição já pronta de um produto antigo direto no campo do admin.
export default function RichDescription({ text }: { text: string }) {
  const lines = text.split(/\r?\n/);

  return (
    <div className="space-y-2.5">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith("--")) {
          const heading = trimmed.replace(/^-+/, "").trim();
          return (
            <h3 key={i} className="mt-5 text-base font-bold text-slate-800 first:mt-0">
              {heading}
            </h3>
          );
        }

        return (
          <p key={i} className="leading-relaxed text-slate-600">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
