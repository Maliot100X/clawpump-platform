import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  try {
    // Register dynamic client
    const regRes = await fetch("https://clawpump-mcp-production.up.railway.app/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: "clawpump-platform-" + Date.now(),
        redirect_uris: ["https://clawpump-platform.vercel.app/api/auth/callback"],
        grant_types: ["authorization_code", "refresh_token"],
        token_endpoint_auth_method: "none",
        response_types: ["code"]
      })
    });
    const reg = await regRes.json();
    const clientId = reg.client_id;

    // Generate PKCE code verifier and challenge
    const codeVerifier = crypto.randomBytes(32).toString("base64url");
    const codeChallenge = crypto.createHash("sha256").update(codeVerifier).digest("base64url");

    // Build auth URL
    const authUrl = "https://clawpump-mcp-production.up.railway.app/authorize?" + new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: "https://clawpump-platform.vercel.app/api/auth/callback",
      scope: "clawpump:agents",
      code_challenge: codeChallenge,
      code_challenge_method: "S256"
    });

    // Store clientId + codeVerifier in a cookie (encrypted would be better, but simple for now)
    const cookie = JSON.stringify({ clientId, codeVerifier });

    const response = NextResponse.json({ authUrl, clientId });
    response.cookies.set("clawpump_oauth", cookie, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 600,
      path: "/"
    });
    return response;
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
