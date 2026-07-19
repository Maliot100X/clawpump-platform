import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    status: "ok",
    platform: "ClawPump Platform",
    version: "0.17.0",
    tools: 134,
    mcp: "oauth_required",
    note: "Run hermes clawpump setup on server to connect MCP"
  });
}
