import CartTable from "@/components/cart/CartTable";
import QuoteForm from "@/components/cart/QuoteForm";
import { getSiteSettings } from "@/lib/queries";

// CartTable usa useSearchParams (para abrir o form de item personalizado
// via ?custom=1), então a página precisa ser renderizada dinamicamente.
export const dynamic = "force-dynamic";

export default async function CartPage() {
  const settings = awa