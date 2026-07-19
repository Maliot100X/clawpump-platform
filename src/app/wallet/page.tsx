"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Loading from "@/components/Loading";
export default function Wallet() {
  const [wallet, setWallet] = useState<any>(null); const [loading, setLoading] = useState(true);
  useEffect(() => { fetch("/api/wallet").then(r => r.json()).then(setWallet).catch(() => setWallet({})).finally(() => setLoading(false)); }, []);
  if (loading) return <Loading text="Loading wallet..." />;
  return (
    <div>
      <PageHeader title="Wallet" subtitle="Agent wallet balances, transactions, and billing" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5"><p className="text-xs text-[#8888aa] uppercase">USDC Balance</p><p className="text-3xl font-bold text-[#00ff88] mt-1">${wallet?.usdc||"0.00"}</p></div>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5"><p className="text-xs text-[#8888aa] uppercase">SOL Balance</p><p className="text-3xl font-bold text-[#3b82f6] mt-1">{wallet?.sol||"0.00"} SOL</p></div>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5"><p className="text-xs text-[#8888aa] uppercase">Budget</p><p className="text-3xl font-bold mt-1">{wallet?.budget||"—"}</p></div>
      </div>
      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5"><h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-3">Recent Transactions</h3><p className="text-[#555577] text-sm">Transaction history will appear here.</p></div>
    </div>
  );
}
