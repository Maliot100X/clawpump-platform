"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
export default function Trading() {
  const [query, setQuery] = useState(""); const [results, setResults] = useState<any[]>([]); const [searching, setSearching] = useState(false);
  async function searchTokens() { if (!query.trim()) return; setSearching(true); try { const res = await fetch("/api/trading?action=search&q="+encodeURIComponent(query)); const d = await res.json(); setResults(d.tokens || []); } catch {} setSearching(false); }
  return (
    <div>
      <PageHeader title="Trading" subtitle="Swap tokens via Jupiter aggregator on Solana" />
      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 mb-6">
        <h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-3">Token Search</h3>
        <div className="flex gap-3">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search token..." className="flex-1 bg-[#12121e] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#00ff88]" onKeyDown={e => e.key === "Enter" && searchTokens()} />
          <button onClick={searchTokens} disabled={searching} className="px-5 py-2.5 bg-[#00ff88] text-black font-semibold rounded-lg disabled:opacity-50">{searching ? "Searching..." : "Search"}</button>
        </div>
      </div>
      {results.length > 0 && (<div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl overflow-hidden mb-6"><table className="w-full"><thead><tr className="border-b border-[#2a2a4a]"><th className="text-left px-4 py-3 text-xs text-[#8888aa] uppercase">Token</th><th className="text-left px-4 py-3 text-xs text-[#8888aa] uppercase">Symbol</th><th className="text-left px-4 py-3 text-xs text-[#8888aa] uppercase">Price</th><th className="text-left px-4 py-3 text-xs text-[#8888aa] uppercase">Action</th></tr></thead><tbody>{results.map((t: any, i: number) => (<tr key={i} className="border-b border-[#2a2a4a33] hover:bg-[#22224033]"><td className="px-4 py-3 text-sm font-medium">{t.name || "—"}</td><td className="px-4 py-3 text-sm text-[#00ff88]">{t.symbol || "—"}</td><td className="px-4 py-3 text-sm">${t.price || "—"}</td><td className="px-4 py-3"><button className="px-3 py-1 bg-[#00ff8815] text-[#00ff88] rounded text-xs font-semibold">Get Quote</button></td></tr>))}</tbody></table></div>)}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5"><h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-3">Market Signals</h3><p className="text-[#555577] text-sm">Real-time market signals from ClawPump MCP.</p></div>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5"><h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-3">Portfolio</h3><p className="text-[#555577] text-sm">Your holdings and P&L will appear here.</p></div>
      </div>
    </div>
  );
}
