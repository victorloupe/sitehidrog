import { NextRequest, NextResponse } from "next/server";
import { updateQuoteStatus } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  const { id, status } = await req.json();
  if (!id || !status) {
    return NextRespon