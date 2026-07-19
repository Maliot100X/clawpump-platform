"use client";
import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";
import Loading from "@/components/Loading";
export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch("/api/dashboard").then(r => r.json()).then(setData).catch(() => setData({})).finally(() => setLoading(false)); }, []);
  if (loading) return <Loading text="Loading dashboard..." />;
  return (
    <div>
      <PageHeader title="Dashboard" subtitle="ClawPump Platform — Solana AI Agent Hub" />
      {/* MCP Status Banner */}
      <div className="bg-[#f9731610] border border-[#f9731630] rounded-xl p-4 mb-6 flex items-center gap-3">
        <span className="text-xl">⚡</span>
        <div>
          <p className="text-sm font-semibold text-[#f97316]">MCP Authentication Required</p>
          <p className="text-xs text-[#8888aa]">Run <code className="bg-[#12121e] px-1.5 py-0.5 rounded text-[#00ff88]">hermes clawpump setup</code> on the server to connect and see live data.</p>
        </div>
        <a href="/settings" className="ml-auto px-4 py-2 bg-[#f97316] text-black text-xs font-semibold rounded-lg hover:bg-[#ea580c] transition-all shrink-0">Setup Guide</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Balance" value={data?.balance ?? "—"} color="green" />
        <StatCard label="Agents" value={String(data?.agents ?? 0)} color="blue" />
        <StatCard label="Tools Available" value="134" color="purple" />
        <StatCard label="MCP Status" value="Needs Auth" color="orange" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[{l:"Create Agent",h:"/agents",i:"🤖"},{l:"Trade Tokens",h:"/trading",i:"📈"},{l:"Launch Token",h:"/tokens",i:"🪙"},{l:"Open Perps",h:"/perps",i:"⚡"},{l:"Setup DCA",h:"/dca",i:"🔄"},{l:"Browse Market",h:"/marketplace",i:"🛒"}].map(a=>(<a key={a.h} href={a.h} className="flex items-center gap-3 p-3 bg-[#12121e] border border-[#2a2a4a] rounded-lg hover:border-[#00ff88] transition-all"><span className="text-xl">{a.i}</span><span className="text-sm font-medium">{a.l}</span></a>))}
          </div>
        </div>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-4">Tool Groups (134 Tools)</h3>
          <div className="space-y-2">
            {[{n:"Trading & DEX",c:15},{n:"Perpetual Futures",c:10},{n:"Agent Management",c:12},{n:"Marketplace",c:11},{n:"Wallet & Billing",c:12},{n:"Gift Cards (Laso)",c:14},{n:"Agent Mail",c:5},{n:"Market Intelligence",c:5},{n:"Lending (Jupiter)",c:4},{n:"Predictions",c:4},{n:"DCA & Limits",c:6},{n:"x402 Pay APIs",c:6}].map(g=>(<div key={g.n} className="flex items-center justify-between p-2 rounded-lg hover:bg-[#22224033]"><span className="text-sm">{g.n}</span><span className="text-xs text-[#8888aa] bg-[#12121e] px-2 py-1 rounded">{g.c} tools</span></div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
