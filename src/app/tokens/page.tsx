"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
export default function Tokens() {
  const [name, setName] = useState(""); const [symbol, setSymbol] = useState(""); const [desc, setDesc] = useState(""); const [launching, setLaunching] = useState(false); const [result, setResult] = useState<any>(null);
  async function launch() { if (!name || !symbol) return; setLaunching(true); try { const res = await fetch("/api/tokens", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ name, symbol, description: desc }) }); setResult(await res.json()); } catch { setResult({ error: "Failed" }); } setLaunching(false); }
  return (
    <div>
      <PageHeader title="Token Launch" subtitle="Launch new tokens on Solana — gasless or Metaplex Genesis" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="glass-card">
          <h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-5">Launch New Token</h3>
          <div className="space-y-3">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Token name" className="input-glass" />
            <input value={symbol} onChange={e => setSymbol(e.target.value)} placeholder="Symbol (e.g. DOGE)" className="input-glass" />
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description (optional)" rows={3} className="input-glass resize-none" />
            <button onClick={launch} disabled={launching || !name || !symbol} className="btn-glow btn-primary w-full disabled:opacity-40">{launching ? "Launching..." : "🚀 Launch Token (Gasless)"}</button>
          </div>
          {result && <div className={"mt-4 p-4 rounded-2xl text-sm "+(result.error?"bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20":"bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20")}>{result.error || "Token launched!"}</div>}
        </div>
        <div className="glass-card">
          <h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-5">Launch Options</h3>
          <div className="space-y-3">
            {[{l:"Gasless Launch",d:"Zero-cost via ClawPump",b:"Ready"},{l:"Metaplex Genesis",d:"Metaplex token standard",b:"Ready"},{l:"Custom Metadata",d:"Image, socials, description",b:"Available"},{l:"Liquidity Pool",d:"Auto Raydium/Orca pool",b:"Coming"}].map((item,i)=>(<div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]"><div><p className="text-sm font-semibold">{item.l}</p><p className="text-xs text-[#555570] mt-0.5">{item.d}</p></div><span className={"badge-glow "+(item.b==="Ready"?"badge-green":item.b==="Available"?"badge-blue":"badge-orange")}>{item.b}</span></div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
