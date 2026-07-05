import { getNewsletterSubscribers } from "@/lib/admin-data";
import DeleteEntityButton from "@/components/admin/DeleteEntityButton";
import NewsletterExportButton from "@/components/admin/NewsletterExportButton";
import Pagination from "@/components/admin/Pagination";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

export default async function NewsletterAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const allSubscribers = await getNewsletterSubscribers();

  const totalPages = Math.max(1, Math.ceil(allSubscribers.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(sp.page) || 1), totalPages);
  const subscribers = allSubscribers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Newsletter</h1>
          <p className="text-sm text-slate-500">{allSubscribers.length} e-mail(s) cadastrado(s)</p>
        </div>
        <NewsletterExportButton subscribers={allSubscribers} />
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Inscrito em</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {subscribers.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">{s.email}</td>
                <td className="px-4 py-3 text-slate-500">{new Date(s.created_at).toLocaleString("pt-BR")}</td>
                <td className="px-4 py-3 text-right">
                  <DeleteEntityButton
                    endpoint={`/api/admin/newsletter/${s.id}`}
                    confirmMessage={`Remover "${s.email}" da lista?`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscribers.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-500">Nenhum e-mail cadastrado ainda.</p>
        )}
        <Pagination page={page} totalPages={totalPages} searchParams={sp} />
      </div>
    </div>
  );
}
