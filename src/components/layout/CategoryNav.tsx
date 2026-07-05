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
              cons