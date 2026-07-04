import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteChrome from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  title: "HidroG - Materiais para Poços Artesianos",
  description:
    "Bombas submersas, painéis, cabos PP, conexões e acessórios para poços artesianos. Monte sua cotação e receba um orçamento personalizado.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-white text-slate-900">
        <CartProvider>
          <SiteChrome header={<Header />} footer={<Footer />}>
            {children}
          </SiteChrome>
        </CartProvider>
      </body>
    </html>
  );
}
