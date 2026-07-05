import { getCategories } from "@/lib/queries";
import { hasSupabase } from "@/lib/supabase/client";
import NewCategoryForm from "@/components/admin/NewCategoryForm";
import DeleteEntityButton from "@/components/admin/DeleteEntityButton";
import EditCategoryImage from "@/components/admin/EditCategoryImage";

export const dynamic = "force-dynamic";


export default async function CategoriasAdminPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Categorias</h1>
      <p className="mb-6 text-sm text-slate-500">{categories.length} categoria(s) cadastrada(s)</p>

      {!hasSupabase && (
        <div className="mb-4 rounded-lg border border-sky-300 bg-sky-50 p-3 text-sm text-brand-dark">
          Modo demonstração: conecte o Supabase para criar ou excluir categorias reais.
        </div>
      )}

      <NewCategoryForm />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Imagem</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 align-top font-medium text-slate-800">
                  {cat.name}
                  <p className="mt-0.5 text-xs font-normal text-slate-400">{cat.slug}</p>
                </td>
                <td className="px-4 py-3 align-top">
                  <EditCategoryImage category={cat} />
                </td>
                <td className="px-4 py-3 text-right align-top">
                  <DeleteEntityButton
                    endpoint={`/api/admin/categorias/${cat.id}`}
                    confirmMessage={`Excluir a categoria "${cat.name}"?`}
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
