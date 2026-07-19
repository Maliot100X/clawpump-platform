"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
export default function Trading() {
  const [query, setQuery] = useState(""); const [results, setResults] = useState<any[]>([]); const [searching, setSearching] = useState(false);
  async function searchTokens() { if (!query.trim()) return; setSearching(true); try { const res = await fetch("/api/trading?action=search&q="+encodeURIComponent(query)); const d = await res.json(); setResults(d.tokens || []); } catch {} setSearching(false); }
  return (
    <div>
      <PageHeader title="Trading" subtitle="Swap tokens via Jupiter aggregator on Solana" />
      <div className="glass-card mb-6">
        <h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-4">Token Search</h3>
        <div className="flex gap-3">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, symbol, or address..." className="input-glass flex-1" onKeyDown={e => e.key === "Enter" && searchTokens()} />
          <button onClick={searchTokens} disabled={searching} className="btn-glow btn-primary disabled:opacity-40">{searching ? "Searching..." : "Search"}</button>
        </div>
      </div>
      {results.length > 0 && (
        <div className="glass-card overflow-hidden mb-6"><table className="table-glass"><thead><tr><th>Token</th><th>Symbol</th><th>Price</th><th>Action</th></tr></thead><tbody>{results.map((t: any, i: number) => (<tr key={i}><td className="font-semibold">{t.name || "—"}</td><td className="text-[#00ff88] font-mono">{t.symbol || "—"}</td><td>${t.price || "—"}</td><td><button className="btn-glow btn-ghost text-xs py-1.5 px-3">Get Quote</button></td></tr>))}</tbody></table></div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card"><h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-3">Market Signals</h3><p className="text-[#555570] text-sm">Real-time signals from ClawPump MCP.</p></div>
        <div className="glass-card"><h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-3">Portfolio</h3><p className="text-[#555570] text-sm">Your holdings and P&L will appear here.</p></div>
      </div>
    </div>
  );
}
