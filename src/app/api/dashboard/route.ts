import { NextResponse } from "next/server";
export async function GET() {
  try {
    const res = await fetch("https://clawpump-mcp-production.up.railway.app", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer cpk_R6NPB3DEkRi_mRoTdqIjRKP-tiXUq1SfA7aUin5TMRU" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "get_balance", arguments: {} } }) });
    const data = await res.json();
    const text = data?.result?.content?.[0]?.text || "{}";
    const bal = JSON.parse(text);
    return NextResponse.json({ balance: bal.usdc_balance || bal.balance || "0.00", agents: 0, marketCap: "—", activity: [] });
  } catch { return NextResponse.json({ balance: "0.00", agents: 0, marketCap: "—", activity: [] }); }
}
