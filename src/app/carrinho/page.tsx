import CartTable from "@/components/cart/CartTable";
import QuoteForm from "@/components/cart/QuoteForm";
import { getSiteSettings } from "@/lib/queries";

// CartTable usa useSearchParams (para abrir o form de item personalizado
// via ?custom=1), então a página precisa ser renderizada dinamicamente.
export const dynamic = "force-dynamic";

export default async function CartPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Minha cotação</h1>
      <div className="space-y-8">
        <CartTable whatsappNumber={settings.whatsapp_number} />
        <QuoteForm />
      </div>
    </div>
  );
}
