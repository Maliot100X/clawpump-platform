import { NextResponse } from "next/server";
async function mcp(tool: string, args: any = {}) {
  const res = await fetch("https://clawpump-mcp-production.up.railway.app", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer cpk_R6NPB3DEkRi_mRoTdqIjRKP-tiXUq1SfA7aUin5TMRU" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: tool, arguments: args } }) });
  const data = await res.json();
  return data?.result?.content?.[0]?.text || "{}";
}
export async function GET() {
  try {
    const [b, w] = await Promise.allSettled([mcp("get_balance"), mcp("get_wallet_summaries")]);
    const bd = b.status === "fulfilled" ? JSON.parse(b.value) : {};
    const wd = w.status === "fulfilled" ? JSON.parse(w.value) : {};
    return NextResponse.json({ usdc: bd.usdc_balance || bd.balance || "0.00", sol: bd.sol_balance || "0.00", budget: wd.budget || "—" });
  } catch { return NextResponse.json({ usdc: "0.00", sol: "0.00", budget: "—" }); }
}
