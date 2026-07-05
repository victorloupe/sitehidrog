"use client";

import { FileSpreadsheet } from "lucide-react";
import { NewsletterSubscriber } from "@/lib/newsletter-store";

export default function NewsletterExportButton({ subscribers }: { subscribers: NewsletterSubscriber[] }) {
  function exportExcel() {
    const header = ["E-mail", "Inscrito em"];
    const rows = subscribers.map((s) => [s.email, new Date(s.created_at).toLocaleString("pt-BR")]);
    const csv = [header, ...rows].map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={exportExcel}
      title="Exportar Excel"
      aria-label="Exportar Excel"
      className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 transition-colors hover:border-green-600 hover:text-green-700"
    >
      <FileSpreadsheet size={16} />
    </button>
  );
}
