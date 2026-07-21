import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteChrome from "@/components/layout/SiteChrome";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { GOOGLE_ADS_ID, GA_MEASUREMENT_ID } from "@/lib/gtag";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HidroG - Materiais para Poços Artesianos",
    template: "%s | HidroG",
  },
  description:
    "Bombas submersas, painéis, cabos PP, conexões e acessórios para poços artesianos. Monte sua cotação e receba um orçamento personalizado.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "HidroG",
    title: "HidroG - Materiais para Poços Artesianos",
    description:
      "Bombas submersas, painéis, cabos PP, conexões e acessórios para poços artesianos.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased bg-white text-slate-900" suppressHydrationWarning>
        {(GOOGLE_ADS_ID || GA_MEASUREMENT_ID) && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID || GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
                ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ""}
              `}
            </Script>
            <GoogleAnalytics />
          </>
        )}
        <CartProvider>
          <SiteChrome header={<Header />} footer={<Footer />}>
            {children}
          </SiteChrome>
        </CartProvider>
      </body>
    </html>
  );
}
