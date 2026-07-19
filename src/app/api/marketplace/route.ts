import { NextResponse } from "next/server";
async function mcp(tool: string, args: any = {}) {
  const res = await fetch("https://clawpump-mcp-production.up.railway.app", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer cpk_R6NPB3DEkRi_mRoTdqIjRKP-tiXUq1SfA7aUin5TMRU" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: tool, arguments: args } }) });
  const data = await res.json();
  return data?.result?.content?.[0]?.text || "{}";
}
export async function GET() {
  try { const r = await mcp("browse_marketplace"); return NextResponse.json({ listings: JSON.parse(r).listings || [] }); } catch { return NextResponse.json({ listings: [] }); }
}
