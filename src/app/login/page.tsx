"use client";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const [step, setStep] = useState<"idle"|"loading"|"done">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("clawpump_token", token);
      setStep("done");
      setTimeout(() => window.location.href = "/", 1000);
    }
    const err = params.get("error");
    if (err) setError(err);
  }, []);

  async function connectClawPump() {
    setStep("loading");
    setError("");
    try {
      const res = await fetch("/api/auth/start");
      const data = await res.json();
      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        setError(data.error || "Failed to start auth");
        setStep("idle");
      }
    } catch (e: any) {
      setError(e.message);
      setStep("idle");
    }
  }

  function logout() {
    localStorage.removeItem("clawpump_token");
    window.location.reload();
  }

  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("clawpump_token");

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00ff88]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#3b82f6]/[0.03] rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#00ff88] to-[#3b82f6] flex items-center justify-center text-black font-black text-3xl shadow-2xl shadow-[#00ff88]/30 animate-float">C</div>
          <h1 className="text-3xl font-bold text-gradient mb-2">ClawPump Platform</h1>
          <p className="text-[#555570] text-sm">Connect your ClawPump account to access 134 MCP tools</p>
        </div>
        <div className="glass-card p-8">
          {step === "done" || isLoggedIn ? (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#00ff88]/10 flex items-center justify-center text-3xl">✓</div>
              <h2 className="text-lg font-bold mb-2 text-[#00ff88]">Connected!</h2>
              <p className="text-[#555570] text-sm mb-6">Your ClawPump account is linked. All 134 MCP tools are available.</p>
              <a href="/" className="btn-glow btn-primary inline-block">Go to Dashboard →</a>
              <button onClick={logout} className="mt-4 text-xs text-[#ef4444] hover:text-[#ef4444]/80">Disconnect</button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-bold mb-2">Connect with ClawPump</h2>
              <p className="text-[#555570] text-sm mb-6">Log in with your ClawPump account to authorize this dashboard. Your key stays encrypted — never exposed to us.</p>
              <button onClick={connectClawPump} disabled={step === "loading"}
                className="btn-glow btn-primary w-full py-4 text-[15px] disabled:opacity-50">
                {step === "loading" ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Redirecting to ClawPump...
                  </span>
                ) : "🔗 Continue with ClawPump login →"}
              </button>
              {error && <div className="mt-4 p-3 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/20 text-[#ef4444] text-sm">{error}</div>}
              <div className="mt-6 pt-6 border-t border-white/[0.04]">
                <p className="text-[11px] text-[#444460] uppercase tracking-[1.5px] font-semibold mb-3">What you get:</p>
                <div className="space-y-2">
                  {["Create & manage AI agents","Trade tokens via Jupiter","Launch new Solana tokens","Phoenix perpetual futures","DCA & limit orders","Jupiter lending yields","Agent marketplace","134 MCP tools total"].map(f => (
                    <div key={f} className="flex items-center gap-2.5 text-[13px] text-[#8888aa]"><span className="text-[#00ff88] text-xs">✓</span>{f}</div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <p className="text-center text-[11px] text-[#333350] mt-6">Powered by ClawPump · Solana · Nous Research</p>
      </div>
    </div>
  );
}
