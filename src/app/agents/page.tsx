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
        <button onClick={() => setShowCreate(true)} className="px-5 py-2.5 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all">+ Create Agent</button>
      </PageHeader>
      {showCreate && (<div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 mb-6"><h3 className="font-semibold mb-3">Create New Agent</h3><div className="flex gap-3"><input value={name} onChange={e => setName(e.target.value)} placeholder="Agent name..." className="flex-1 bg-[#12121e] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#00ff88]" /><button onClick={createAgent} disabled={creating} className="px-5 py-2.5 bg-[#00ff88] text-black font-semibold rounded-lg disabled:opacity-50">{creating ? "Creating..." : "Create"}</button><button onClick={() => setShowCreate(false)} className="px-5 py-2.5 bg-[#2a2a4a] rounded-lg">Cancel</button></div></div>)}
      {agents.length === 0 ? (<div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-12 text-center"><p className="text-4xl mb-3">🤖</p><p className="text-lg font-semibold">No agents yet</p><p className="text-[#8888aa] text-sm mt-1">Create your first agent to get started.</p></div>) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{agents.map((a: any) => (<div key={a.id || a.agent_id} className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 hover:border-[#00ff88] transition-all"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00ff88] to-[#3b82f6] flex items-center justify-center text-black font-bold">{(a.name || "A")[0]}</div><div><p className="font-semibold">{a.name || "Agent"}</p><p className="text-xs text-[#555577]">{a.id || a.agent_id}</p></div></div><div className="grid grid-cols-2 gap-2 text-xs"><div className="bg-[#12121e] rounded-lg p-2"><p className="text-[#8888aa]">Balance</p><p className="font-semibold text-[#00ff88]">{a.balance || "0 SOL"}</p></div><div className="bg-[#12121e] rounded-lg p-2"><p className="text-[#8888aa]">Status</p><p className="font-semibold">{a.status || "active"}</p></div></div></div>))}</div>
      )}
    </div>
  );
}
