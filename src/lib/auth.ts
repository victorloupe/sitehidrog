// Autenticação simples do painel administrativo.
//
// Modo Supabase (recomendado): quando NEXT_PUBLIC_SUPABASE_URL e
// NEXT_PUBLIC_SUPABASE_ANON_KEY estão configurados, o login usa
// Supabase Auth (crie o usuário admin em Authentication > Users no
// painel do Supabase).
//
// Modo local (sem Supabase): usada apenas para testar o painel antes
// de conectar o banco de dados real. A senha vem de ADMIN_LOCAL_PASSWORD
// no .env.local (padrão: "admin123" — troque antes de usar em produção).
import { cookies } from "next/headers";
import { hasSupabase, createClient as createServerSupabase } from "@/lib/supabase/server";

export const ADMIN_SESSION_COOKIE = "sitehidrog_admin_session";

export function getLocalAdminPassword() {
  return process.env.ADMIN_LOCAL_PASSWORD || "admin123";
}

// Verifica se a requisição atual tem uma sessão de admin válida
// (Supabase Auth ou cookie local, dependendo do modo). Use isto no
// início de toda rota de API sob /api/admin/* que altera dados —
// o middleware não protege rotas de API, então cada rota precisa
// checar isso explicitamente.
export async function requireAdmin(): Promise<boolean> {
  if (hasSupabase) {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return Boolean(user);
  }
  const cookieStore = await cookies();
  return Boolean(cookieStore.get(ADMIN_SESSION_COOKIE));
}
