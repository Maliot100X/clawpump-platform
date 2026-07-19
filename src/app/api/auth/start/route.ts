import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  try {
    // 1. Register dynamic client
    const regRes = await fetch("https://clawpump-mcp-production.up.railway.app/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: "clawpump-dash-" + Date.now(),
        redirect_uris: ["https://clawpump-platform.vercel.app/api/auth/callback"],
        grant_types: ["authorization_code", "refresh_token"],
        token_endpoint_auth_method: "none",
        response_types: ["code"]
      })
    });
    const reg = await regRes.json();
    const clientId = reg.client_id;

    // 2. Generate PKCE
    const codeVerifier = crypto.randomBytes(32).toString("base64url");
    const codeChallenge = crypto.createHash("sha256").update(codeVerifier).digest("base64url");

    // 3. Build the MCP authorize URL
    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: "https://clawpump-platform.vercel.app/api/auth/callback",
      scope: "clawpump:agents",
      code_challenge: codeChallenge,
      code_challenge_method: "S256"
    });
    const mcpAuthUrl = "https://clawpump-mcp-production.up.railway.app/authorize?" + params.toString();

    // 4. Fetch the authorize page to extract the clawpump.tech login link
    const authPageRes = await fetch(mcpAuthUrl);
    const authPageHtml = await authPageRes.text();

    // Extract the "Continue with ClawPump login" href
    const hrefMatch = authPageHtml.match(/href="(https:\/\/clawpump\.tech\/connect\/mcp[^"]*)"/);
    let authUrl = mcpAuthUrl; // fallback to MCP authorize

    if (hrefMatch) {
      // Decode the return URL to get back to MCP authorize after clawpump.tech login
      authUrl = hrefMatch[1];
    }

    // 5. Store clientId + codeVerifier in cookie
    const response = NextResponse.json({ authUrl, clientId });
    response.cookies.set("clawpump_oauth", JSON.stringify({ clientId, codeVerifier }), {
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
