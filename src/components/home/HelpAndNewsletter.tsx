import Link from "next/link";
import { Mail, MessageCircle, PackageSearch } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

export default function HelpAndNewsletter({ whatsappNumber }: { whatsappNumber: string }) {
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Olá! Não encontrei no site o produto que eu procurava, vocês podem me ajudar?"
  )}`;

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <PackageSearch className="mb-3 text-brand-dark" size={26} />
          <h3 className="text-lg font-bold text-slate-800">Não encontrou o que procura?</h3>
          <p className="mt-1 text-sm text-slate-500">
            Peça uma cotação personalizada — descreva o produto e a gente cuida do resto.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/carrinho?custom=1"
              className="rounded-md border border-brand-dark px-4 py-2 text-sm font-semibold text-brand-dark hover:bg-sky-50"
            >
              Pedir cotação personalizada
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1ebe5a]"
            >
              <MessageCircle size={16} /> Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <Mail className="mb-3 text-brand-dark" size={26} />
          <h3 className="text-lg font-bold text-slate-800">Receba nossas ofertas</h3>
          <p className="mt-1 text-sm text-slate-500">
            Cadastre seu e-mail e fique por dentro de promoções e novidades da HidroG.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
