"use client";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Loading from "@/components/Loading";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("clawpump_token");
}

async function mcpCall(tool: string, args: any = {}) {
  const token = getToken();
  if (!token) return { error: "Not connected" };
  const res = await fetch("/api/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
    body: JSON.stringify({ tool, args })
  });
  return res.json();
}

export default function Agents() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }
    setConnected(true);
    mcpCall("list_agents").then(d => {
      setAgents(d.agents || d || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  async function createAgent() {
    if (!name.trim()) return;
    setCreating(true);
    try {
      const d = await mcpCall("create_agent", { name });
      if (d.agent || d.id) { setAgents(p => [...p, d.agent || d]); setShowCreate(false); setName(""); }
    } catch {}
    setCreating(false);
  }

  async function deleteAgent(agentId: string) {
    if (!confirm("Delete this agent?")) return;
    await mcpCall("delete_agent", { agent_id: agentId, confirm: true });
    setAgents(p => p.filter(a => (a.id || a.agent_id) !== agentId));
    setSelectedAgent(null);
  }

  if (loading) return <Loading text="Loading agents..." />;

  if (!connected) {
    return (
      <div>
        <PageHeader title="Agents" subtitle="Create and manage your AI agents on Solana" />
        <div className="glass-card text-center py-20">
          <p className="text-5xl mb-4">🔐</p>
          <p className="text-xl font-bold mb-2">Not Connected</p>
          <p className="text-[#555570] text-sm mb-6">Connect your ClawPump account to manage agents.</p>
          <a href="/login" className="btn-glow btn-primary inline-block">Connect with ClawPump →</a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Agents" subtitle={`${agents.length} agent${agents.length!==1?"s":""} · Solana`}>
        <button onClick={() => setShowCreate(true)} className="btn-glow btn-primary">+ Create Agent</button>
      </PageHeader>

      {showCreate && (
        <div className="glass-card mb-6">
          <h3 className="text-sm font-semibold text-[#aaaacc] mb-4">Create New Agent</h3>
          <div className="flex gap-3">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Agent name..." className="input-glass flex-1" onKeyDown={e => e.key==="Enter" && createAgent()} />
            <button onClick={createAgent} disabled={creating} className="btn-glow btn-primary disabled:opacity-40">{creating ? "Creating..." : "Create"}</button>
            <button onClick={() => setShowCreate(false)} className="btn-glow btn-ghost">Cancel</button>
          </div>
        </div>
      )}

      {agents.length === 0 ? (
        <div className="glass-card text-center py-20">
          <p className="text-5xl mb-4 animate-float">🤖</p>
          <p className="text-xl font-bold mb-2">No agents yet</p>
          <p className="text-[#555570] text-sm mb-6">Create your first agent to start trading, launching tokens, and more.</p>
          <button onClick={() => setShowCreate(true)} className="btn-glow btn-primary">+ Create First Agent</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((a: any) => {
            const aid = a.id || a.agent_id;
            return (
              <div key={aid} className="glass-card group cursor-pointer" onClick={() => setSelectedAgent(a)}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00ff88] to-[#3b82f6] flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-[#00ff88]/20 group-hover:scale-110 transition-transform">
                    {(a.name || "A")[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{a.name || "Agent"}</p>
                    <p className="text-[11px] text-[#444460] font-mono truncate">{aid}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-white/[0.02]"><p className="text-[10px] text-[#444460] uppercase tracking-wider">Balance</p><p className="text-sm font-bold text-[#00ff88] mt-1">{a.balance || "—"}</p></div>
                  <div className="p-3 rounded-xl bg-white/[0.02]"><p className="text-[10px] text-[#444460] uppercase tracking-wider">Status</p><p className="text-sm font-bold mt-1">{a.status || "active"}</p></div>
                  <div className="p-3 rounded-xl bg-white/[0.02]"><p className="text-[10px] text-[#444460] uppercase tracking-wider">Skills</p><p className="text-sm font-bold mt-1">{a.skills?.length || 0}</p></div>
                </div>
                {a.wallet && <p className="text-[10px] text-[#333350] font-mono mt-3 truncate">Wallet: {a.wallet}</p>}
              </div>
            );
          })}
        </div>
      )}

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedAgent(null)}>
          <div className="glass-card w-full max-w-lg mx-4 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00ff88] to-[#3b82f6] flex items-center justify-center text-black font-bold text-xl shadow-lg">{(selectedAgent.name||"A")[0]}</div>
              <div><p className="text-xl font-bold">{selectedAgent.name}</p><p className="text-[11px] text-[#444460] font-mono">{selectedAgent.id || selectedAgent.agent_id}</p></div>
            </div>
            <div className="space-y-3 mb-6">
              {[{l:"Wallet",v:selectedAgent.wallet||"—"},{l:"Balance",v:selectedAgent.balance||"—"},{l:"Status",v:selectedAgent.status||"active"},{l:"Model",v:selectedAgent.model||"default"}].map(i=>(
                <div key={i.l} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]"><span className="text-[13px] text-[#666680]">{i.l}</span><span className="text-[13px] font-semibold">{i.v}</span></div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => { navigator.clipboard.writeText(selectedAgent.id || selectedAgent.agent_id); }} className="btn-glow btn-ghost flex-1">Copy ID</button>
              <button onClick={() => deleteAgent(selectedAgent.id || selectedAgent.agent_id)} className="btn-glow flex-1 py-3 bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20 rounded-xl font-semibold hover:bg-[#ef4444]/20 transition-all">Delete</button>
              <button onClick={() => setSelectedAgent(null)} className="btn-glow btn-ghost">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
