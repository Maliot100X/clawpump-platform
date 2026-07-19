"use client";
import PageHeader from "@/components/PageHeader";
export default function Lending() {
  return (
    <div><PageHeader title="Jupiter Lending" subtitle="Earn yield by lending tokens on Solana" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card"><h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-5">Available Markets</h3><div className="space-y-2">{["USDC","SOL","USDT","mSOL"].map(t=>(<div key={t} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]"><span className="text-sm font-semibold">{t}</span><span className="text-xs text-[#666680]">APY: —</span></div>))}</div></div>
        <div className="glass-card"><h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-5">Your Positions</h3><p className="text-[#555570] text-sm">Your lending positions will appear here.</p></div>
      </div>
    </div>
  );
}
