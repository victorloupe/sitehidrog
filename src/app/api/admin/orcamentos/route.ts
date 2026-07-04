import { NextRequest, NextResponse } from "next/server";
import { updateQuoteStatus } from "@/lib/admin-data";

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ error: "id e status são obrigatórios" }, { status: 400 });
  }
  await updateQuoteStatus(id, status);
  return NextResponse.json({ ok: true });
}
