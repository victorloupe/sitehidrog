import Link from "next/link";
import { LayoutDashboard, FileText, Package, Tags, Award, Phone, Mail, ExternalLink } from "lucide-react";
import LogoutButton from "./LogoutButton";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orcamentos", label: "Orçamentos", icon: FileText },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/categorias", label: "Categorias", icon: Tags },
  { href: "/admin/marcas", label: "Marcas", icon: Award },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/configuracoes", label: "Contato", icon: Phone },
];

export default function AdminSidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col justify-between overflow-y-auto bg-slate-900 px-3 py-6 text-white print:hidden">
      <div>
        <div className="mb-8 px-3 text-lg font-bold">
          HIDRO<span className="text-slate-400">G</span>
          <div className="text-xs font-normal text-slate-400">Painel admin</div>
        </div>
        <nav className="space-y-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ExternalLink size={16} /> Ver loja
        </Link>
        <LogoutButton />
      </div>
    </aside>
  );
}
