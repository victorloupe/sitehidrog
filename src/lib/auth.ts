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
export const ADMIN_SESSION_COOKIE = "sitehidrog_admin_session";

export function getLocalAdminPassword() {
  return process.env.ADMIN_LOCAL_PASSWORD || "admin123";
}
