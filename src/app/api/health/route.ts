import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ status: "ok", platform: "ClawPump Platform", version: "0.17.0", tools: 134 });
}
