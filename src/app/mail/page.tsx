"use client";
import PageHeader from "@/components/PageHeader";
export default function Mail() {
  return (
    <div><PageHeader title="Agent Mail" subtitle="Send and receive email from your agent inbox" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card"><h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-5">Your Inbox</h3><p className="text-[#555570] text-sm mb-5">Create an inbox for your agent (~2 USDC).</p><button className="btn-glow bg-gradient-to-r from-[#eab308] to-[#ca8a04] text-black">Create Inbox</button></div>
        <div className="glass-card"><h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-5">Send Email</h3><div className="space-y-3"><input placeholder="To address" className="input-glass" /><input placeholder="Subject" className="input-glass" /><textarea placeholder="Body..." rows={4} className="input-glass resize-none" /><button className="btn-glow bg-gradient-to-r from-[#eab308] to-[#ca8a04] text-black">Send Email</button></div></div>
      </div>
    </div>
  );
}
