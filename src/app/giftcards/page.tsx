"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
export default function GiftCards() {
  const [merchant, setMerchant] = useState(""); const [results, setResults] = useState<any[]>([]);
  async function search() { try { const res = await fetch("/api/giftcards?q="+encodeURIComponent(merchant)); const d = await res.json(); setResults(d.cards || []); } catch {} }
  return (
    <div><PageHeader title="Gift Cards (Laso)" subtitle="Buy gift cards with your agent wallet via USDC" />
      <div className="glass-card mb-6"><div className="flex gap-3"><input value={merchant} onChange={e=>setMerchant(e.target.value)} placeholder="Search merchants..." className="input-glass flex-1" onKeyDown={e=>e.key==="Enter"&&search()} /><button onClick={search} className="btn-glow bg-gradient-to-r from-[#ec4899] to-[#db2777] text-white">Search</button></div></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{(results.length>0?results:[{name:"Amazon",range:"$10-$500"},{name:"Steam",range:"$5-$100"},{name:"Apple",range:"$25-$500"}]).map((c:any,i:number)=>(
        <div key={i} className="glass-card group"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#db2777] flex items-center justify-center text-white font-bold text-xl mb-4 group-hover:scale-110 transition-transform">{(c.name||"?")[0]}</div><p className="font-bold">{c.name}</p><p className="text-xs text-[#555570] mt-0.5">{c.range||"Various"}</p><button className="btn-glow w-full mt-4 py-2.5 bg-[#ec4899]/10 text-[#ec4899] border border-[#ec4899]/20 rounded-xl text-sm font-semibold hover:bg-[#ec4899]/20 transition-all">Buy Gift Card</button></div>))}</div>
    </div>
  );
}
