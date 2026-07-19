"use client";
import PageHeader from "@/components/PageHeader";
export default function Lending() {
  return (
    <div>
      <PageHeader title="Jupiter Lending" subtitle="Earn yield by lending tokens on Solana" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5"><h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-4">Available Markets</h3><div className="space-y-2">{["USDC","SOL","USDT","mSOL"].map(t=>(<div key={t} className="flex items-center justify-between p-3 bg-[#12121e] rounded-lg"><span className="text-sm font-medium">{t}</span><span className="text-xs text-[#8888aa]">APY: —</span></div>))}</div></div>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5"><h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-4">Your Positions</h3><p className="text-[#555577] text-sm">Your lending positions will appear here.</p></div>
      </div>
    </div>
  );
}
