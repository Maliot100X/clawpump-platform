import { NextRequest, NextResponse } from "next/server";
async function mcp(tool: string, args: any = {}) {
  const res = await fetch("https://clawpump-mcp-production.up.railway.app", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer cpk_R6NPB3DEkRi_mRoTdqIjRKP-tiXUq1SfA7aUin5TMRU" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: tool, arguments: args } }) });
  const data = await res.json();
  return data?.result?.content?.[0]?.text || "{}";
}
export async function POST(req: NextRequest) {
  try { const b = await req.json(); const r = await mcp("launch_token_gasless", { name: b.name, symbol: b.symbol, description: b.description || "" }); return NextResponse.json(JSON.parse(r)); } catch { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
export async function GET() {
  try { const r = await mcp("get_launch_status"); return NextResponse.json(JSON.parse(r)); } catch { return NextResponse.json({ status: "unknown" }); }
}
