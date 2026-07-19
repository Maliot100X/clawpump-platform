import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { tool, args } = await req.json();
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "No authorization token" }, { status: 401 });
  }

  try {
    const res = await fetch("https://clawpump-mcp-production.up.railway.app/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
        "Mcp-Protocol-Version": "2024-11-05"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: { name: tool, arguments: args || {} }
      })
    });
    const data = await res.json();
    if (data?.result?.content?.[0]?.text) {
      try { return NextResponse.json(JSON.parse(data.result.content[0].text)); }
      catch { return NextResponse.json({ raw: data.result.content[0].text }); }
    }
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
