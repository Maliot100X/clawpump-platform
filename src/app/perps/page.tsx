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
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5"><p className="text-xs text-[#8888aa] uppercase">Open Interest</p><p className="text-2xl font-bold text-[#3b82f6] mt-1">$0</p></div>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5"><p className="text-xs text-[#8888aa] uppercase">24h Volume</p><p className="text-2xl font-bold text-[#00ff88] mt-1">$0</p></div>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5"><p className="text-xs text-[#8888aa] uppercase">Your Positions</p><p className="text-2xl font-bold mt-1">0</p></div>
      </div>
      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2a2a4a]"><h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider">Available Markets</h3></div>
        <table className="w-full"><thead><tr className="border-b border-[#2a2a4a]"><th className="text-left px-4 py-3 text-xs text-[#8888aa] uppercase">Market</th><th className="text-left px-4 py-3 text-xs text-[#8888aa] uppercase">Price</th><th className="text-left px-4 py-3 text-xs text-[#8888aa] uppercase">24h Change</th><th className="text-left px-4 py-3 text-xs text-[#8888aa] uppercase">Funding</th><th className="text-left px-4 py-3 text-xs text-[#8888aa] uppercase">Action</th></tr></thead><tbody>
          {markets.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-[#555577]">No markets loaded. Connect ClawPump MCP for live data.</td></tr>}
          {markets.map((m: any, i: number) => (<tr key={i} className="border-b border-[#2a2a4a33] hover:bg-[#22224033]"><td className="px-4 py-3 text-sm font-medium">{m.symbol||"—"}</td><td className="px-4 py-3 text-sm">${m.price||"—"}</td><td className="px-4 py-3 text-sm">{m.change?m.change+"%":"—"}</td><td className="px-4 py-3 text-sm text-[#8888aa]">{m.funding||"—"}</td><td className="px-4 py-3"><button className="px-3 py-1 bg-[#3b82f615] text-[#3b82f6] rounded text-xs font-semibold">Trade</button></td></tr>))}
        </tbody></table>
      </div>
    </div>
  );
}
