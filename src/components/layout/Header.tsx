import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { getCategories } from "@/lib/queries";
import CartIcon from "./CartIcon";
import CategoryNav from "./CategoryNav";

export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Barra superior institucional */}
      <div className="hidden bg-slate-900 text-slate-300 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Phone size={13} /> (17) 3216-5760
            </span>
            <a href="https://api.whatsapp.com/send?phone=5517981548788" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-brand">
              <Phone size={13} /> WhatsApp (17) 98154-8788
            </a>
            <span className="flex items-center gap-1.5">
              <Mail size={13} /> hidro.g@hotmail.com
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> Atendemos todo o Brasil
            </span>
          </div>
          <span className="text-brand">Orçamento rápido e sem compromisso</span>
        </div>
      </div>

      {/* Faixa principal */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Link
            href="/"
            className="shrink-0 transition-transform duration-200 hover:scale-[1.03]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logohidrog.png" alt="HidroG - Materiais para poços artesianos" className="h-12 w-auto md:h-14" />
          </Link>

          <form action="/busca" className="mx-2 hidden flex-1 md:flex">
            <input
              type="text"
              name="q"
              placeholder="Buscar bombas, pressurizadores, tubos..."
              className="w-full rounded-l-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm text-slate-900 transition-colors focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
            <button
              type="submit"
              className="rounded-r-full bg-brand-dark px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0b5a87] active:scale-95"
            >
              Buscar
            </button>
          </form>

          <div className="ml-auto flex items-center gap-2">
            <CartIcon />
          </div>
        </div>

        {/* Busca mobile */}
        <div className="px-4 pb-3 md:hidden">
          <form action="/busca" className="flex">
            <input
              type="text"
              name="q"
              placeholder="Buscar produtos..."
              className="w-full rounded-l-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 focus:outline-none"
            />
            <button type="submit" className="rounded-r-full bg-brand-dark px-4 py-2 text-sm font-semibold text-white">
              Buscar
            </button>
          </form>
        </div>
      </div>

      <CategoryNav categories={categories} />
    </header>
  );
}
