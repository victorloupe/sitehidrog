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

export const ADMIN_SESSION_COOKIE 