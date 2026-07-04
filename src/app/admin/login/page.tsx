"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const hasSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Falha no login.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-8 shadow-sm"
      >
        <h1 className="mb-1 text-xl font-bold text-slate-900">Painel administrativo</h1>
        <p className="mb-6 text-sm text-slate-500">HidroG — acesso restrito</p>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-slate-700">E-mail</label>
          <input
            type="text"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usado apenas no modo Supabase — pode deixar em branco"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="mb-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Senha</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && <p className="mb-4 mt-2 text-sm font-medium text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-md bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0b5a87] disabled:opacity-60"
        >
          Entrar
        </button>

        <p className="mt-4 text-xs text-slate-400">
          {hasSupabase
            ? "Use o e-mail e a senha do usuário criado em Authentication > Users no Supabase."
            : <>Sem Supabase conectado: use a senha definida em <code>ADMIN_LOCAL_PASSWORD</code> (padrão: admin123) e deixe o e-mail em branco ou com qualquer valor.</>}{" "}
          Clique no olho para conferir o que foi digitado.
        </p>
      </form>
    </div>
  );
}
