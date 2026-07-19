"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Loading from "@/components/Loading";
export default function Perps() {
  const [markets, setMarkets] = useState<any[]>([]); const [loading, setLoading] = useState(true);
  useEffect(() => { fetch("/api/perps").then(r => r.json()).then(d => setMarkets(d.markets || [])).catch(() => {}).finally(() => setLoading(false)); }, []);
  if (loading) return <Loading text="Loading perps markets..." />;
  return (
    <div>
      <PageHeader title="Phoenix Perps" subtitle="Perpetual futures trading on Solana" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card"><p className="text-[11px] text-[#555570] uppercase tracking-[1.5px] font-semibold">Open Interest</p><p className="text-[28px] font-bold text-[#3b82f6] mt-2">$0</p></div>
        <div className="stat-card"><p className="text-[11px] text-[#555570] uppercase tracking-[1.5px] font-semibold">24h Volume</p><p className="text-[28px] font-bold text-[#00ff88] mt-2">$0</p></div>
        <div className="stat-card"><p className="text-[11px] text-[#555570] uppercase tracking-[1.5px] font-semibold">Positions</p><p className="text-[28px] font-bold mt-2">0</p></div>
      </div>
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.04]"><h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px]">Available Markets</h3></div>
        <table className="table-glass"><thead><tr><th>Market</th><th>Price</th><th>24h</th><th>Funding</th><th>Action</th></tr></thead><tbody>
          {markets.length === 0 && <tr><td colSpan={5} className="text-center py-12 text-[#444460]">No markets loaded. Connect MCP for live data.</td></tr>}
          {markets.map((m: any, i: number) => (<tr key={i}><td className="font-semibold">{m.symbol||"—"}</td><td>${m.price||"—"}</td><td className={(m.change||0)>=0?"text-[#00ff88]":"text-[#ef4444]"}>{m.change?m.change+"%":"—"}</td><td className="text-[#666680]">{m.funding||"—"}</td><td><button className="btn-glow btn-ghost text-xs py-1.5 px-3">Trade</button></td></tr>))}
        </tbody></table>
      </div>
    </div>
  );
}
