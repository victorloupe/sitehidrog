"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Quando o link de "imprimir" na lista de orçamentos abre esta página com
// ?print=1, dispara o diálogo de impressão do navegador automaticamente
// (o usuário escolhe "Salvar como PDF" ali). Ver QuoteActions.tsx.
export default function AutoPrint() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("print") === "1") {
      const timeout = setTimeout(() => window.print(), 300);
      return () => clearTimeout(timeout);
    }
  }, [searchParams]);

  return null;
}
