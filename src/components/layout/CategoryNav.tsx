"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { Category } from "@/lib/types";

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-slate-200 bg-white">
      {/* Mobile: botão que abre a lista de categorias, sem precisar rolar na horizontal */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-semibold text-slate-700"
        >
          <span className="flex items-center gap-2">
            <Menu size={16} /> Categorias
          </span>
          <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="grid grid-cols-2 gap-1 border-t border-slate-100 px-4 py-3">
            {categories.map((cat) => {
              const href = `/categoria/${cat.slug}`;
              const active = pathname === href;
              return (
                <Link
                  key={cat.id}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    active ? "bg-sky-50 text-brand-dark" : "text-slate-600 hover:bg-slate-50 hover:text-brand-dark"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop/tablet: faixa horizontal com todas as categorias */}
      <div className="mx-auto hidden max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 text-sm md:flex">
        <span className="flex shrink-0 items-center gap-1 pr-3 font-semibold text-slate-500">
          <Menu size={16} /> Categorias
        </span>
        {categories.map((cat) => {
          const href = `/categoria/${cat.slug}`;
          const active = pathname === href;
          return (
            <Link
              key={cat.id}
              href={href}
              className={`nav-underline shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 font-medium transition-colors ${
                active ? "text-brand-dark" : "text-slate-600 hover:text-brand-dark"
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
