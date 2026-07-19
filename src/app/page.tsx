"use client";
import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";
import Loading from "@/components/Loading";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Handle token from OAuth callback
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("clawpump_token", token);
      window.history.replaceState({}, "", "/");
    }
    const hasToken = !!localStorage.getItem("clawpump_token");
    setConnected(hasToken);

    fetch("/api/dashboard").then(r => r.json()).then(setData).catch(() => setData({})).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading text="Loading..." />;

  return (
    <div className="relative">
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#00ff88]/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#3b82f6]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <PageHeader title="Dashboard" subtitle="ClawPump Platform — Solana AI Agent Hub" />

      {!connected && (
        <div className="glass-card mb-6 flex items-center gap-4 p-5 border-l-[3px] border-l-[#00ff88]">
          <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center text-lg shrink-0">🔗</div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#00ff88]">Connect Your ClawPump Account</p>
            <p className="text-xs text-[#666680] mt-0.5">Authorize to access 134 MCP tools, agents, trading, and wallet.</p>
          </div>
          <a href="/login" className="btn-glow btn-primary text-xs shrink-0">Connect Now →</a>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Balance" value={connected ? (data?.balance ?? "—") : "—"} color="green" icon="💰" />
        <StatCard label="Active Agents" value={String(data?.agents ?? 0)} color="blue" icon="🤖" />
        <StatCard label="MCP Tools" value="134" color="purple" icon="🔧" />
        <StatCard label="Status" value={connected ? "Connected" : "Not Connected"} color={connected ? "green" : "orange"} icon={connected ? "✓" : "🔗"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-2 glass-card">
          <h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-5">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[{l:"Create Agent",h:"/agents",i:"🤖",c:"from-[#00ff88]/10 to-transparent"},{l:"Trade Tokens",h:"/trading",i:"📈",c:"from-[#3b82f6]/10 to-transparent"},{l:"Launch Token",h:"/tokens",i:"🪙",c:"from-[#a855f7]/10 to-transparent"},{l:"Open Perps",h:"/perps",i:"⚡",c:"from-[#f97316]/10 to-transparent"},{l:"Setup DCA",h:"/dca",i:"🔄",c:"from-[#06b6d4]/10 to-transparent"},{l:"Browse Market",h:"/marketplace",i:"🛒",c:"from-[#ec4899]/10 to-transparent"}].map(a=>(
              <a key={a.h} href={a.h} className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br ${a.c} border border-white/[0.04] hover:border-[#00ff88]/20 transition-all duration-300 group`}>
                <span className="text-2xl group-hover:scale-110 transition-transform">{a.i}</span>
                <span className="text-[13px] font-semibold text-[#aaaacc] group-hover:text-[#e8e8f0] transition-colors">{a.l}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 glass-card">
          <h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-5">134 MCP Tools</h3>
          <div className="grid grid-cols-2 gap-2">
            {[{n:"Trading & DEX",c:15,clr:"bg-[#00ff88]"},{n:"Perpetual Futures",c:10,clr:"bg-[#3b82f6]"},{n:"Agent Management",c:12,clr:"bg-[#a855f7]"},{n:"Marketplace",c:11,clr:"bg-[#f97316]"},{n:"Wallet & Billing",c:12,clr:"bg-[#06b6d4]"},{n:"Gift Cards (Laso)",c:14,clr:"bg-[#ec4899]"},{n:"Agent Mail",c:5,clr:"bg-[#eab308]"},{n:"Market Intel",c:5,clr:"bg-[#ef4444]"},{n:"Lending (Jupiter)",c:4,clr:"bg-[#10b981]"},{n:"Predictions",c:4,clr:"bg-[#6366f1]"},{n:"DCA & Limits",c:6,clr:"bg-[#f59e0b]"},{n:"x402 Pay APIs",c:6,clr:"bg-[#8b5cf6]"}].map(g=>(
              <div key={g.n} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-all group">
                <div className={`w-2 h-2 rounded-full ${g.clr} group-hover:scale-125 transition-transform`} />
                <span className="text-[13px] text-[#8888aa] group-hover:text-[#aaaacc] transition-colors flex-1">{g.n}</span>
                <span className="text-[11px] text-[#444460] bg-white/[0.03] px-2 py-0.5 rounded-md font-mono">{g.c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
