import { ProductSpec } from "@/lib/types";

export default function SpecsTable({ specs }: { specs: ProductSpec[] }) {
  if (specs.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full text-sm">
        <tbody>
          {specs.map((spec, i) => (
            <tr key={spec.spec_name} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
              <td className="w-1/3 px-4 py-2.5 font-semibold text-slate-600">{spec.spec_name}</td>
              <td className="px-4 py-2.5 text-slate-800">{spec.spec_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
