"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Loading from "@/components/Loading";
export default function Marketplace() {
  const [listings, setListings] = useState<any[]>([]); const [loading, setLoading] = useState(true);
  useEffect(() => { fetch("/api/marketplace").then(r => r.json()).then(d => setListings(d.listings || [])).catch(() => {}).finally(() => setLoading(false)); }, []);
  if (loading) return <Loading text="Loading marketplace..." />;
  return (
    <div><PageHeader title="Agent Marketplace" subtitle="Buy and sell AI agents on Solana"><button className="btn-glow bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white">+ List Agent</button></PageHeader>
      {listings.length===0?(<div className="glass-card text-center py-20"><p className="text-5xl mb-4 animate-float">🛒</p><p className="text-xl font-bold mb-2">Marketplace is empty</p><p className="text-[#555570] text-sm">No agents listed yet.</p></div>):(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{listings.map((l:any,i:number)=>(
          <div key={i} className="glass-card group"><div className="flex items-center gap-4 mb-4"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f97316] to-[#ef4444] flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">{(l.name||"A")[0]}</div><div><p className="font-bold">{l.name||"Agent"}</p><p className="text-[11px] text-[#444460]">by {l.seller||"unknown"}</p></div></div>
          <p className="text-3xl font-bold text-gradient-warm mb-4">{l.price||"—"} SOL</p><button className="btn-glow w-full py-3 bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20 rounded-xl font-semibold hover:bg-[#f97316]/20 transition-all">Place Bid</button></div>))}</div>
      )}
    </div>
  );
}
