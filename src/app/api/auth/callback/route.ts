import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const oauthCookie = req.cookies.get("clawpump_oauth")?.value;

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code_received", req.url));
  }

  let clientId = "";
  let codeVerifier = "test";

  if (oauthCookie) {
    try {
      const parsed = JSON.parse(oauthCookie);
      clientId = parsed.clientId || "";
      codeVerifier = parsed.codeVerifier || "test";
    } catch {}
  }

  try {
    // Exchange code for access token
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
      // Success — redirect to dashboard with token in URL (will be stored in localStorage by client)
      const response = NextResponse.redirect(
        new URL("/?token=" + encodeURIComponent(tokenData.access_token), req.url)
      );
      // Clear the oauth cookie
      response.cookies.set("clawpump_oauth", "", { maxAge: 0, path: "/" });
      return response;
    } else {
      const error = tokenData.error_description || tokenData.error || "token_exchange_failed";
      return NextResponse.redirect(new URL("/login?error=" + encodeURIComponent(error), req.url));
    }
  } catch (e: any) {
    return NextResponse.redirect(new URL("/login?error=" + encodeURIComponent(e.message), req.url));
  }
}
