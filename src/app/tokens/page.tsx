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
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-4">Launch New Token</h3>
          <div className="space-y-3">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Token name" className="w-full bg-[#12121e] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#00ff88]" />
            <input value={symbol} onChange={e => setSymbol(e.target.value)} placeholder="Symbol" className="w-full bg-[#12121e] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#00ff88]" />
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description (optional)" rows={3} className="w-full bg-[#12121e] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#00ff88] resize-none" />
            <button onClick={launch} disabled={launching || !name || !symbol} className="w-full py-3 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black font-semibold rounded-lg disabled:opacity-50">{launching ? "Launching..." : "Launch Token (Gasless)"}</button>
          </div>
          {result && <div className={"mt-3 p-3 rounded-lg text-sm "+(result.error?"bg-[#ef444415] text-[#ef4444]":"bg-[#00ff8815] text-[#00ff88]")}>{result.error || "Token launched!"}</div>}
        </div>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-4">Launch Options</h3>
          <div className="space-y-3">
            {[{l:"Gasless Launch",d:"Zero-cost via ClawPump",b:"Ready"},{l:"Metaplex Genesis",d:"Metaplex token standard",b:"Ready"},{l:"Custom Metadata",d:"Image, socials, description",b:"Available"},{l:"Liquidity Pool",d:"Auto Raydium/Orca pool",b:"Coming"}].map((item,i)=>(<div key={i} className="flex items-center justify-between p-3 bg-[#12121e] rounded-lg"><div><p className="text-sm font-medium">{item.l}</p><p className="text-xs text-[#555577]">{item.d}</p></div><span className={"text-xs px-2 py-1 rounded "+(item.b==="Ready"?"bg-[#00ff8815] text-[#00ff88]":item.b==="Available"?"bg-[#3b82f615] text-[#3b82f6]":"bg-[#f9731615] text-[#f97316]")}>{item.b}</span></div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
