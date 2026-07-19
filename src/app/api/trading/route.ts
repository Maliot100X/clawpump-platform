import { NextRequest, NextResponse } from "next/server";
async function mcp(tool: string, args: any = {}) {
  const res = await fetch("https://clawpump-mcp-production.up.railway.app", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer cpk_R6NPB3DEkRi_mRoTdqIjRKP-tiXUq1SfA7aUin5TMRU" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: tool, arguments: args } }) });
  const data = await res.json();
  return data?.result?.content?.[0]?.text || "{}";
}
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams; const action = sp.get("action");
  try {
    if (action === "search") { const r = await mcp("token_search", { query: sp.get("q") || "" }); return NextResponse.json({ tokens: JSON.parse(r).tokens || [] }); }
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
