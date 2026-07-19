"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Loading from "@/components/Loading";
export default function Marketplace() {
  const [listings, setListings] = useState<any[]>([]); const [loading, setLoading] = useState(true);
  useEffect(() => { fetch("/api/marketplace").then(r => r.json()).then(d => setListings(d.listings || [])).catch(() => {}).finally(() => setLoading(false)); }, []);
  if (loading) return <Loading text="Loading marketplace..." />;
  return (
    <div>
      <PageHeader title="Agent Marketplace" subtitle="Buy and sell AI agents on Solana">
        <button className="px-5 py-2.5 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-semibold rounded-lg">+ List Agent</button>
      </PageHeader>
      {listings.length === 0 ? (<div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-12 text-center"><p className="text-4xl mb-3">🛒</p><p className="text-lg font-semibold">Marketplace is empty</p><p className="text-[#8888aa] text-sm mt-1">No agents listed yet.</p></div>) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{listings.map((l: any, i: number) => (<div key={i} className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 hover:border-[#f97316] transition-all"><div className="flex items-center gap-3 mb-3"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f97316] to-[#ef4444] flex items-center justify-center text-white font-bold text-lg">{(l.name||"A")[0]}</div><div><p className="font-semibold">{l.name||"Agent"}</p><p className="text-xs text-[#555577]">by {l.seller||"unknown"}</p></div></div><p className="text-2xl font-bold text-[#f97316] mb-3">{l.price||"—"} SOL</p><button className="w-full py-2.5 bg-[#f9731615] text-[#f97316] font-semibold rounded-lg hover:bg-[#f9731625]">Place Bid</button></div>))}</div>
      )}
    </div>
  );
}
