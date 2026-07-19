"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
export default function DCA() {
  const [show, setShow] = useState(false);
  return (
    <div><PageHeader title="DCA & Limit Orders" subtitle="Dollar-cost averaging and limit orders on Solana"><button onClick={()=>setShow(!show)} className="btn-glow btn-primary">+ New DCA</button></PageHeader>
      {show && (<div className="glass-card mb-6"><h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-4">Create DCA Order</h3><div className="grid grid-cols-1 md:grid-cols-4 gap-3"><input placeholder="Input token" className="input-glass" /><input placeholder="Output token" className="input-glass" /><input placeholder="Amount" className="input-glass" /><button className="btn-glow btn-primary">Create</button></div></div>)}
      <div className="glass-card overflow-hidden"><table className="table-glass"><thead><tr><th>Pair</th><th>Amount</th><th>Interval</th><th>Status</th></tr></thead><tbody><tr><td colSpan={4} className="text-center py-12 text-[#444460]">No DCA orders yet</td></tr></tbody></table></div>
    </div>
  );
}
