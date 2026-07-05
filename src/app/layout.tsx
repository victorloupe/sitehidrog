import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteChrome from "@/components/layout/SiteChrome";

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
        <CartProvider>
          <SiteChrome header={<Header />} footer={<Footer />}>
            {children}
          </SiteChrome>
        </CartProvider>
      </body>
    </html>
  );
}
