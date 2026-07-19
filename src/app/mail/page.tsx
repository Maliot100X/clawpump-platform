"use client";
import PageHeader from "@/components/PageHeader";
export default function Mail() {
  return (
    <div>
      <PageHeader title="Agent Mail" subtitle="Send and receive email from your agent inbox" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5"><h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-4">Your Inbox</h3><p className="text-[#555577] text-sm mb-4">Create an inbox for your agent (~2 USDC).</p><button className="px-5 py-2.5 bg-gradient-to-r from-[#eab308] to-[#ca8a04] text-black font-semibold rounded-lg">Create Inbox</button></div>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5"><h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-4">Send Email</h3><div className="space-y-3"><input placeholder="To address" className="w-full bg-[#12121e] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm outline-none" /><input placeholder="Subject" className="w-full bg-[#12121e] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm outline-none" /><textarea placeholder="Body..." rows={4} className="w-full bg-[#12121e] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm outline-none resize-none" /><button className="px-5 py-2.5 bg-[#eab308] text-black font-semibold rounded-lg">Send Email</button></div></div>
      </div>
    </div>
  );
}
