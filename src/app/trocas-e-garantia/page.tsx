import type { Metadata } from "next";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { getSiteSettings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Trocas e garantia",
  description: "Política de trocas, devoluções e garantia dos produtos HidroG.",
};

export default async function TrocasGarantiaPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Trocas e garantia</h1>
      <p className="mb-6 text-xs text-slate-400">Última atualização: julho de 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-slate-600">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">Garantia dos produtos</h2>
          <p>
            Todos os produtos vendidos pela HidroG possuem garantia legal contra vícios e defeitos de fabricação,
            conforme o Código de Defesa do Consumidor (Lei 8.078/90): 90 dias para produtos duráveis, contados a
            partir da entrega. Além da garantia legal, muitos fabricantes (como Ebara, Bombas Leão e outros)
            oferecem garantia contratual adicional — o prazo exato e as condições de cada marca constam na nota
            fiscal e/ou no manual que acompanha o produto.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">Direito de arrependimento</h2>
          <p>
            Como a compra é fechada à distância (pelo site, WhatsApp ou telefone), você tem direito de se
            arrepender da compra em até 7 dias corridos a partir do recebimento do produto, sem precisar justificar
            o motivo, conforme o Art. 49 do Código de Defesa do Consumidor. Nesse caso, o produto deve ser devolvido
            sem sinais de uso, com embalagem, manual e acessórios originais.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">Como solicitar troca, devolução ou garantia</h2>
          <ol className="list-decimal space-y-1.5 pl-5">
            <li>Entre em contato com a gente pelo WhatsApp, telefone ou e-mail (veja abaixo).</li>
            <li>Informe o produto, a data da compra e o motivo (defeito, arrependimento, produto errado, etc.).</li>
            <li>Se possível, envie fotos ou um vídeo do problema — isso agiliza a análise.</li>
            <li>Nossa equipe vai orientar os próximos passos: troca, reparo, devolução do valor ou acionamento da garantia do fabricante.</li>
          </ol>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">Custos de frete</h2>
          <p>
            Em casos de defeito de fabricação ou erro no envio, o custo do frete de devolução é por nossa conta.
            Em caso de arrependimento sem defeito, o frete de devolução também corre por conta da loja, conforme
            previsto em lei para compras feitas à distância.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">Situações fora da garantia</h2>
          <p>
            A garantia não cobre danos causados por mau uso, instalação inadequada (fora das especificações
            técnicas do produto), sobrecarga elétrica, desgaste natural de peças de consumo ou uso em condições
            diferentes das indicadas pelo fabricante.
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
          </ul>
        </section>

        <p className="border-t border-slate-100 pt-4 text-xs text-slate-400">
          Este texto é um resumo geral da nossa política e da legislação aplicável, e pode ser atualizado sem
          aviso prévio. Em caso de dúvida sobre um caso específico, fale diretamente com a gente pelos canais acima.
        </p>
      </div>
    </div>
  );
}
