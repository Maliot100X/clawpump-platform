"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Loading from "@/components/Loading";
export default function Agents() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  useEffect(() => { fetch("/api/agents").then(r => r.json()).then(d => setAgents(d.agents || [])).catch(() => {}).finally(() => setLoading(false)); }, []);
  async function createAgent() {
    if (!name.trim()) return; setCreating(true);
    try { const res = await fetch("/api/agents", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ name }) }); const d = await res.json(); if (d.agent) setAgents(p => [...p, d.agent]); setShowCreate(false); setName(""); } catch {}
    setCreating(false);
  }
  if (loading) return <Loading text="Loading agents..." />;
  return (
    <div>
      <PageHeader title="Agents" subtitle="Create and manage your AI agents on Solana">
        <button onClick={() => setShowCreate(true)} className="btn-glow btn-primary">+ Create Agent</button>
      </PageHeader>
      {showCreate && (
        <div className="glass-card mb-6">
          <h3 className="text-sm font-semibold text-[#aaaacc] mb-4">Create New Agent</h3>
          <div className="flex gap-3">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Agent name..." className="input-glass flex-1" />
            <button onClick={createAgent} disabled={creating} className="btn-glow btn-primary disabled:opacity-40">{creating ? "Creating..." : "Create"}</button>
            <button onClick={() => setShowCreate(false)} className="btn-glow btn-ghost">Cancel</button>
          </div>
        </div>
      )}
      {agents.length === 0 ? (
        <div className="glass-card text-center py-20">
          <p className="text-5xl mb-4 animate-float">🤖</p>
          <p className="text-xl font-bold mb-2">No agents yet</p>
          <p className="text-[#555570] text-sm">Create your first agent to start trading, launching tokens, and more.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((a: any) => (
            <div key={a.id || a.agent_id} className="glass-card group cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00ff88] to-[#3b82f6] flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-[#00ff88]/20 group-hover:scale-110 transition-transform">{(a.name || "A")[0]}</div>
                <div><p className="font-bold">{a.name || "Agent"}</p><p className="text-[11px] text-[#444460] font-mono mt-0.5">{a.id || a.agent_id}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-white/[0.02]"><p className="text-[10px] text-[#444460] uppercase tracking-wider">Balance</p><p className="text-sm font-bold text-[#00ff88] mt-1">{a.balance || "0 SOL"}</p></div>
                <div className="p-3 rounded-xl bg-white/[0.02]"><p className="text-[10px] text-[#444460] uppercase tracking-wider">Status</p><p className="text-sm font-bold mt-1">{a.status || "active"}</p></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
