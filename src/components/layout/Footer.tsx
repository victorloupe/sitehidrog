import Link from "next/link";
import { Phone, Mail, MapPin, Lock } from "lucide-react";
import { getCategories } from "@/lib/queries";

export default async function Footer() {
  const categories = await getCategories();

  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="mb-1 text-xl font-bold text-white">
            HIDRO<span className="text-slate-400">G</span>
          </h3>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">
            Materiais para poços artesianos
          </p>
          <p className="text-sm leading-relaxed text-slate-400">
            Somos uma loja online especializada na venda de materiais para poços artesianos: bombas submersas, painéis,
            cabos PP, conexões e acessórios, com atendimento especializado. Solicite sua cotação sem compromisso.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="https://facebook.com/hidrogbombas" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-bold transition-all duration-200 hover:scale-110 hover:bg-brand">
              f
            </a>
            <a href="https://instagram.com/hidrogbombas" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-bold transition-all duration-200 hover:scale-110 hover:bg-pink-600">
              ig
            </a>
          </div>
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
            <li><a href="#" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-brand">Sobre a loja</a></li>
            <li><a href="#" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-brand">Trocas e garantia</a></li>
            <li><a href="#" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-brand">Política de privacidade</a></li>
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
            <li className="flex items-center gap-2"><Phone size={14} /> (17) 3216-5760</li>
            <li className="flex items-center gap-2">
              <a href="https://api.whatsapp.com/send?phone=5517981548788" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1 hover:text-brand">
                <Phone size={14} /> WhatsApp: (17) 98154-8788
              </a>
            </li>
            <li className="flex items-center gap-2"><Mail size={14} /> hidro.g@hotmail.com</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> Atendemos todo o Brasil</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        Pereira e Pereira Bombas e Tubos — CNPJ: 12.835.772/0001-22 · © {new Date().getFullYear()} HidroG. Todos os direitos reservados.
      </div>
    </footer>
  );
}
