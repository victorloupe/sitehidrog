import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { hasSupabase, createClient as createServerSupabase } from "@/lib/supabase/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (hasSupabase) {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      redirect("/admin/login");
    }
  } else {
    const cookieStore = await cookies();
    if (!cookieStore.get(ADMIN_SESSION_COOKIE)) {
      redirect("/admin/login");
    }
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-slate-100 p-8">{children}</div>
    </div>
  );
}
