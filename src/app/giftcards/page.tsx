"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
export default function GiftCards() {
  const [merchant, setMerchant] = useState(""); const [results, setResults] = useState<any[]>([]);
  async function search() { try { const res = await fetch("/api/giftcards?q="+encodeURIComponent(merchant)); const d = await res.json(); setResults(d.cards || []); } catch {} }
  return (
    <div>
      <PageHeader title="Gift Cards (Laso)" subtitle="Buy gift cards with your agent wallet via USDC" />
      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 mb-6"><div className="flex gap-3"><input value={merchant} onChange={e => setMerchant(e.target.value)} placeholder="Search merchants..." className="flex-1 bg-[#12121e] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm outline-none" onKeyDown={e => e.key==="Enter" && search()} /><button onClick={search} className="px-5 py-2.5 bg-gradient-to-r from-[#ec4899] to-[#db2777] text-white font-semibold rounded-lg">Search</button></div></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{(results.length>0?results:[{name:"Amazon",range:"$10-$500"},{name:"Steam",range:"$5-$100"},{name:"Apple",range:"$25-$500"}]).map((c:any,i:number)=>(<div key={i} className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 hover:border-[#ec4899] transition-all"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ec4899] to-[#db2777] flex items-center justify-center text-white font-bold mb-3">{(c.name||"?")[0]}</div><p className="font-semibold">{c.name}</p><p className="text-xs text-[#555577]">{c.range||"Various"}</p><button className="mt-3 w-full py-2 bg-[#ec489915] text-[#ec4899] rounded-lg text-sm font-semibold">Buy Gift Card</button></div>))}</div>
    </div>
  );
}
