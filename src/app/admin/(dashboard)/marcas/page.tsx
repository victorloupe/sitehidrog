import { getBrands } from "@/lib/queries";
import { hasSupabase } from "@/lib/supabase/client";
import NewBrandForm from "@/components/admin/NewBrandForm";
import DeleteEntityButton from "@/components/admin/DeleteEntityButton";

export const dynamic = "force-dynamic";


export default async function MarcasAdminPage() {
  const brands = await getBrands();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Marcas</h1>
      <p className="mb-6 text-sm text-slate-500">{brands.length} marca(s) cadastrada(s)</p>

      {!hasSupabase && (
        <div className="mb-4 rounded-lg border border-sky-300 bg-sky-50 p-3 text-sm text-brand-dark">
          Modo demonstração: conecte o Supabase para criar ou excluir marcas reais.
        </div>
      )}

      <NewBrandForm />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Marca</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {brands.map((brand) => (
              <tr key={brand.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">{brand.name}</td>
                <td className="px-4 py-3 text-slate-500">{brand.slug}</td>
                <td className="px-4 py-3 text-right">
                  <DeleteEntityButton
                    endpoint={`/api/admin/marcas/${brand.id}`}
                    confirmMessage={`Excluir a marca "${brand.name}"?`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
