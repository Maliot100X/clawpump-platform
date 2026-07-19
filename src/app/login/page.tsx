"use client";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const [step, setStep] = useState<"idle"|"loading"|"done">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if token was passed back from callback
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("clawpump_token", token);
      setStep("done");
      setTimeout(() => window.location.href = "/", 1000);
    }
    // Check for error
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
          <h2 className="text-lg font-bold mb-2">Connect with ClawPump</h2>
          <p className="text-[#555570] text-sm mb-6">Authorize this dashboard to access your agents, trading, wallet, and all 134 MCP tools on Solana.</p>
          <button onClick={connectClawPump} disabled={step === "loading"}
            className="btn-glow btn-primary w-full py-4 text-[15px] disabled:opacity-50">
            {step === "loading" ? "Connecting..." : step === "done" ? "✓ Connected" : "🔗 Connect with ClawPump"}
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
        </div>
        <p className="text-center text-[11px] text-[#333350] mt-6">Powered by ClawPump · Solana · Nous Research</p>
      </div>
    </div>
  );
}
