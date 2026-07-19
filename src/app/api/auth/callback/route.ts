import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const cookie = req.cookies.get("clawpump_oauth")?.value;

  if (!code || !cookie) {
    return NextResponse.redirect(new URL("/login?error=missing_code", req.url));
  }

  try {
    const { clientId, codeVerifier } = JSON.parse(cookie);

    // Exchange code for token
    const tokenRes = await fetch("https://clawpump-mcp-production.up.railway.app/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: "https://clawpump-platform.vercel.app/api/auth/callback",
        client_id: clientId,
        code_verifier: codeVerifier
      }).toString()
    });
    const tokenData = await tokenRes.json();

    if (tokenData.access_token) {
      // Store token in localStorage via a redirect with token in hash
      const response = NextResponse.redirect(new URL("/?token=" + encodeURIComponent(tokenData.access_token), req.url));
      return response;
    } else {
      return NextResponse.redirect(new URL("/login?error=token_exchange_failed", req.url));
    }
  } catch (e) {
    return NextResponse.redirect(new URL("/login?error=" + encodeURIComponent(String(e)), req.url));
  }
}
