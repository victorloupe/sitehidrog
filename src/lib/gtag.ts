// Integração com o Google tag (gtag.js): conversão de "cotação enviada"
// no Google Ads + visitas do site no Google Analytics 4 (GA4).
//
// --- Google Ads (conversão) ---
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

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

/**
 * Dispara o evento de conversão "cotação enviada" para o Google Ads.
 * Chame isso assim que o formulário de cotação for enviado com sucesso.
 */
export function trackQuoteConversion() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!GOOGLE_ADS_ID || !GOOGLE_ADS_CONVERSION_LABEL) return;

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
  });
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
