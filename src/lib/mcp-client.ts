const MCP_URL = "https://clawpump-mcp-production.up.railway.app";

export async function registerClient() {
  const res = await fetch(MCP_URL + "/register", {
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
  return res.json();
}

export function getAuthUrl(clientId: string, codeChallenge: string) {
  return MCP_URL + "/authorize?" + new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: "https://clawpump-platform.vercel.app/api/auth/callback",
    scope: "clawpump:agents",
    code_challenge: codeChallenge,
    code_challenge_method: "S256"
  });
}

export async function exchangeCode(clientId: string, code: string, codeVerifier: string) {
  const res = await fetch(MCP_URL + "/token", {
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
  return res.json();
}

export async function callMCPTool(accessToken: string, tool: string, args: any = {}) {
  const res = await fetch(MCP_URL + "/mcp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + accessToken,
      "Mcp-Protocol-Version": "2024-11-05"
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name: tool, arguments: args }
    })
  });
  const data = await res.json();
  if (data?.result?.content?.[0]?.text) {
    try { return JSON.parse(data.result.content[0].text); } catch { return data.result.content[0].text; }
  }
  return data;
}
