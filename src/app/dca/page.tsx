"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
export default function DCA() {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <div>
      <PageHeader title="DCA & Limit Orders" subtitle="Dollar-cost averaging and limit orders on Solana">
        <button onClick={() => setShowCreate(!showCreate)} className="px-5 py-2.5 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black font-semibold rounded-lg">+ New DCA</button>
      </PageHeader>
      {showCreate && (<div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 mb-6"><h3 className="font-semibold mb-3">Create DCA Order</h3><div className="grid grid-cols-1 md:grid-cols-4 gap-3"><input placeholder="Input token" className="bg-[#12121e] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm outline-none" /><input placeholder="Output token" className="bg-[#12121e] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm outline-none" /><input placeholder="Amount" className="bg-[#12121e] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm outline-none" /><button className="px-5 py-2.5 bg-[#00ff88] text-black font-semibold rounded-lg">Create</button></div></div>)}
      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl overflow-hidden"><table className="w-full"><thead><tr className="border-b border-[#2a2a4a]"><th className="text-left px-4 py-3 text-xs text-[#8888aa] uppercase">Pair</th><th className="text-left px-4 py-3 text-xs text-[#8888aa] uppercase">Amount</th><th className="text-left px-4 py-3 text-xs text-[#8888aa] uppercase">Interval</th><th className="text-left px-4 py-3 text-xs text-[#8888aa] uppercase">Status</th></tr></thead><tbody><tr><td colSpan={4} className="px-4 py-8 text-center text-[#555577]">No DCA orders yet</td></tr></tbody></table></div>
    </div>
  );
}
