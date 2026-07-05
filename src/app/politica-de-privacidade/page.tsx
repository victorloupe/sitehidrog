import type { Metadata } from "next";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { getSiteSettings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como a HidroG coleta, usa e protege seus dados pessoais.",
};

export default async function PoliticaPrivacidadePage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Política de privacidade</h1>
      <p className="mb-6 text-xs text-slate-400">Última atualização: julho de 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-slate-600">
        <p>
          Esta política explica como a HidroG (Hidro G Bombas Submersas LTDA.) coleta, usa e protege os dados
          pessoais dos visitantes e clientes do nosso site, em conformidade com a Lei Geral de Proteção de Dados
          (LGPD — Lei nº 13.709/2018).
        </p>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">Quais dados coletamos</h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong>Dados de cotação:</strong> nome, telefone, e-mail, cidade/endereço e os itens da sua lista de
              produtos, informados quando você solicita um orçamento.
            </li>
            <li>
              <strong>Newsletter:</strong> o e-mail informado voluntariamente para receber ofertas e novidades.
            </li>
            <li>
              <strong>Dados de navegação:</strong> os itens da sua cotação ficam salvos apenas no seu próprio
              navegador (armazenamento local), não utilizamos cookies de rastreamento ou publicidade.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">Como usamos os dados</h2>
          <p>
            Usamos as informações fornecidas exclusivamente para: elaborar e enviar orçamentos, entrar em contato
            sobre seu pedido, enviar comunicações de ofertas (caso você tenha se cadastrado na newsletter) e
            melhorar o atendimento. Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">Onde os dados ficam armazenados</h2>
          <p>
            Os dados de cotações e cadastros de newsletter são armazenados em banco de dados na nuvem (Supabase),
            com controle de acesso restrito à nossa equipe. Adotamos medidas técnicas razoáveis para proteger essas
            informações contra acesso não autorizado.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">Seus direitos</h2>
          <p>
            Conforme a LGPD, você pode solicitar a qualquer momento: confirmação de que tratamos seus dados, acesso
            aos dados armazenados, correção de informações incorretas, exclusão dos seus dados ou revogação do
            consentimento para receber comunicações (por exemplo, cancelar a inscrição na newsletter). Para
            exercer qualquer um desses direitos, entre em contato pelos canais abaixo.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">Contato sobre seus dados</h2>
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
          Esta política pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou na
          legislação. Recomendamos revisitar esta página de tempos em tempos.
        </p>
      </div>
    </div>
  );
}
