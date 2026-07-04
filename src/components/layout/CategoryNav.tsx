"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Category } from "@/lib/types";

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 text-sm">
        <span className="hidden shrink-0 items-center gap-1 pr-3 font-semibold text-slate-500 md:flex">
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
