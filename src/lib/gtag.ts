// Integração com o Google tag (gtag.js): conversão de "cotação enviada"
// no Google Ads + visitas do site no Google Analytics 4 (GA4).
//
// --- Conversão "cotação enviada" (via evento do GA4) ---
// A conta do Google Ads já tem a ação de conversão "Enviar formulário de
// lead" importada do GA4, esperando o evento "ads_conversion_Formul_rio_1"
// (nome gerado pelo próprio Google a partir de "Formulário"). Assim que o
// GA4 (NEXT_PUBLIC_GA_ID) estiver configurado, o site dispara esse evento
// automaticamente ao enviar a cotação — não precisa criar nada novo no
// painel do Google Ads.
//
// --- Google Ads (conversão via tag própria, alternativa/opcional) ---
// Só necessário se um dia quiser uma conversão separada, fora do GA4:
// 1. No Google Ads, crie a ação de conversão: Ferramentas e configurações >
//    Conversões > Nova ação de conversão > Site > categoria "Enviar
//    formulário de lead". Dê o nome "Cotação enviada".
// 2. O Google Ads vai gerar um ID no formato "AW-XXXXXXXXX" e um rótulo
//    (label) no formato "AbC-D_efG-h12_34567".
// 3. Preencha no .env.local:
//      NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
//      NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=AbC-D_efG-h12_34567
//
// --- Google Analytics 4 (visitas do site, tempo real) ---
// 1. Crie uma propriedade em https://analytics.google.com (gratuito).
// 2. Copie o ID de métricas, formato "G-XXXXXXXXXX".
// 3. Preencha no .env.local:
//      NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
//
// Depois de preencher, reinicie o servidor (npm run dev) ou refaça o
// deploy. Sem essas variáveis, o site funciona normalmente e nenhuma tag
// é carregada (nada é enviado ao Google).

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
export const GOOGLE_ADS_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Nome exato do evento do GA4 que a ação de conversão "Enviar formulário de
// lead" (importada no Google Ads) já espera receber. Não alterar sem
// atualizar também a conversão em Google Ads > Metas > Conversões.
const QUOTE_LEAD_EVENT_NAME = "ads_conversion_Formul_rio_1";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

/**
 * Dispara o evento de conversão "cotação enviada". Chame isso assim que o
 * formulário de cotação for enviado com sucesso.
 *
 * Dispara dois eventos, cada um só se a respectiva tag estiver configurada:
 * 1. O evento do GA4 que a conversão "Enviar formulário de lead" (já ativa
 *    na conta do Google Ads) espera receber — funciona assim que
 *    NEXT_PUBLIC_GA_ID estiver definido, sem precisar de mais nada.
 * 2. Opcionalmente, uma conversão própria do Google Ads (AW-ID/label), caso
 *    algum dia seja configurada separadamente.
 */
export function trackQuoteConversion() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  if (GA_MEASUREMENT_ID) {
    window.gtag("event", QUOTE_LEAD_EVENT_NAME);
  }

  if (GOOGLE_ADS_ID && GOOGLE_ADS_CONVERSION_LABEL) {
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
    });
  }
}

/**
 * Registra uma visualização de página no GA4. O gtag.js já registra a
 * primeira carga automaticamente; isso cobre as trocas de página do
 * Next.js (App Router) que não recarregam a página inteira.
 */
export function trackPageview(url: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!GA_MEASUREMENT_ID) return;

  window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
}
