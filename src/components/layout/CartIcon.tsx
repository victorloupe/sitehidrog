"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { totalItems } = useCart();
  const [bounce, setBounce] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setBounce(true);
    const timeout = setTimeout(() => setBounce(false), 500);
    return () => clearTimeout(timeout);
  }, [totalItems]);

  return (
    <Link
      href="/carrinho"
      aria-label={`Minha cotação${totalItems > 0 ? `, ${totalItems} item(ns)` : ""}`}
      className="relative flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-4 py-2.5 text-sm font-semibold text-brand-dark transition-all hover:bg-brand/10 active:scale-95"
    >
      <ShoppingCart size={20} className={bounce ? "animate-bounce-once" : ""} />
      <span className="hidden sm:inline">Cotação</span>
      {totalItems > 0 && (
        <span
          className={`absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-dark px-1 text-xs font-bold text-white ${
            bounce ? "animate-bounce-once" : ""
          }`}
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
}
