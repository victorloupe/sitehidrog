import Link from "next/link";
import { Phone, Mail, MapPin, Lock, MessageCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { getCategories, getSiteSettings } from "@/lib/queries";

export default async function Footer() {
  const [categories, settings] = await Promise.all([getCategories(), getSiteSettings()]);

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logohidrog.png"
            alt="HidroG - Materiais para poços artesianos"
            className="mb-4 h-14 w-auto sm:h-16"
          />
          <p className="text-sm leading-relaxed text-slate-400">
            Somos uma loja online especializada na venda de materiais para poços artesianos: bombas submersas, painéis,
            cabos PP, conexões e acessórios, com atendimento especializado. Solicite sua cotação sem compromisso.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Categorias</h4>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <Link href={`/categoria/${cat.slug}`} className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-brand">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Institucional</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-brand">Home</Link></li>
            <li><Link href="/carrinho" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-brand">Minha cotação</Link></li>
            <li><Link href="/sobre" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-brand">Sobre a loja</Link></li>
            <li><Link href="/trocas-e-garantia" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-brand">Trocas e garantia</Link></li>
            <li><Link href="/politica-de-privacidade" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-brand">Política de privacidade</Link></li>
            <li>
              <Link
                href="/admin"
                className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-brand hover:text-brand"
              >
                <Lock size={12} /> Acesso administrativo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Contato</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone size={14} /> {settings.phone}</li>
            <li className="flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?phone=${settings.whatsapp_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1 hover:text-brand"
              >
                <MessageCircle size={14} className="text-[#25D366]" /> {settings.whatsapp_display}
              </a>
            </li>
            <li className="flex items-center gap-2"><Mail size={14} /> {settings.email}</li>
            <li className="flex items-center gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1 hover:text-brand"
              >
                <MapPin size={14} /> {settings.address}
              </a>
            </li>
          </ul>

          <div className="mt-4 flex items-center gap-3">
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-