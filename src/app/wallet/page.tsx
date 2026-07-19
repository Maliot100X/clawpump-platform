"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Loading from "@/components/Loading";
export default function Wallet() {
  const [wallet, setWallet] = useState<any>(null); const [loading, setLoading] = useState(true);
  useEffect(() => { fetch("/api/wallet").then(r => r.json()).then(setWallet).catch(() => setWallet({})).finally(() => setLoading(false)); }, []);
  if (loading) return <Loading text="Loading wallet..." />;
  return (
    <div><PageHeader title="Wallet" subtitle="Agent wallet balances, transactions, and billing" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card"><p className="text-[11px] text-[#555570] uppercase tracking-[1.5px] font-semibold">USDC Balance</p><p className="text-[28px] font-bold text-[#00ff88] mt-2">${wallet?.usdc||"0.00"}</p></div>
        <div className="stat-card"><p className="text-[11px] text-[#555570] uppercase tracking-[1.5px] font-semibold">SOL Balance</p><p className="text-[28px] font-bold text-[#3b82f6] mt-2">{wallet?.sol||"0.00"} SOL</p></div>
        <div className="stat-card"><p className="text-[11px] text-[#555570] uppercase tracking-[1.5px] font-semibold">Budget</p><p className="text-[28px] font-bold mt-2">{wallet?.budget||"—"}</p></div>
      </div>
      <div className="glass-card"><h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-4">Recent Transactions</h3><p className="text-[#555570] text-sm">Transaction history will appear here.</p></div>
    </div>
  );
}
