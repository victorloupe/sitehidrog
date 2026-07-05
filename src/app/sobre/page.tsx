import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { getSiteSettings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Sobre a loja",
  description: "Conheça a HidroG: materiais para poços artesianos com o maior estoque da região.",
};

export default async function SobrePage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Sobre a loja</h1>

      <div className="space-y-6 text-sm leading-relaxed text-slate-600">
        <p>
          A HidroG (Hidro G Bombas Submersas LTDA.) é uma loja especializada em materiais para poços artesianos:
          bombas submersas, painéis de comando, cabos PP, conexões, tampas e ferramentas. Trabalhamos com marcas
          reconhecidas no mercado — como Ebara, Bombas Leão, Anauger, Schneider, Tupy e Condumig, entre outras —
          para atender desde pequenas propriedades até fazendas, sítios e chácaras com grande demanda de água.
        </p>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">O que nos diferencia</h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Um dos maiores estoques da região, com pronta entrega para a maioria dos itens.</li>
            <li>Produtos 100% originais, com nota fiscal e garantia de fábrica.</li>
            <li>Atendimento especializado para ajudar a escolher o equipamento certo para o seu poço.</li>
            <li>Entrega para toda a região atendida pela loja.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">Como funciona a cotação</h2>
          <p>
            Não vendemos diretamente pelo site: você monta sua lista de produtos, adiciona à sua cotação e envia
            seus dados de contato e entrega. A partir daí, nossa equipe analisa o pedido e retorna com um
            orçamento personalizado, sem compromisso, incluindo prazo e condições de pagamento.
          </p>
          <p className="mt-2">
            Se não encontrar o produto que precisa no catálogo, você também pode{" "}
            <Link href="/carrinho?custom=1" className="font-medium text-brand-dark hover:underline">
              pedir uma cotação personalizada
            </Link>{" "}
            descrevendo o que procura.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">Fale com a gente</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-brand-dark" /> {settings.phone}
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={15} className="text-brand-dark" /> WhatsApp: {settings.whatsapp_display}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-brand-dark" /> {settings.email}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={15} className="text-brand-dark" /> {settings.address}
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
