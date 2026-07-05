import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  function hrefFor(p: number) {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") params.set(key, value);
    });
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `?${qs}` : "?";
  }

  return (
    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm print:hidden">
      <span className="text-slate-500">
        Página {page} de {totalPages}
      </span>
      <div className="flex gap-2">
        <Link
          href={hrefFor(Math.max(1, page - 1))}
          className={`flex items-center gap-1 rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-600 ${
            page <= 1 ? "pointer-events-none opacity-40" : "hover:border-brand-dark hover:text-brand-dark"
          }`}
        >
          <ChevronLeft size={14} /> Anterior
        </Link>
        <Link
          href={hrefFor(Math.min(totalPages, page + 1))}
          className={`flex items-center gap-1 rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-600 ${
            page >= totalPages ? "pointer-events-none opacity-40" : "hover:border-brand-dark hover:text-brand-dark"
          }`}
        >
          Próxima <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
