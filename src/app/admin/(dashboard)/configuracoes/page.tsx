import { getSiteSettings } from "@/lib/queries";
import { hasSupabase } from "@/lib/supabase/client";
import ContactSettingsForm from "@/components/admin/ContactSettingsForm";

export const dynamic = "force-dynamic";

export default async function ConfiguracoesAdminPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Informações de contato</h1>
      <p className="mb-6 text-sm text-slate-500">
        Telefone, WhatsApp, e-mail, endereço e redes sociais exibidos no cabeçalho e no rodapé do site.
      </p>

      {!hasSupabase && (
        <div className="mb-4 rounded-lg border border-sky-300 bg-sky-50 p-3 text-sm text-brand-dark">
          Modo demonstração: conecte o Supabase para salvar essas informações de verdade.
        </div>
      )}

      <ContactSettingsForm settings={settings} />
    </div>
  );
}
