"use client";
import PageHeader from "@/components/PageHeader";
export default function Settings() {
  return (
    <div><PageHeader title="Settings" subtitle="Platform configuration and MCP connection" />
      <div className="space-y-6">
        <div className="glass-card">
          <h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-5">ClawPump MCP Connection</h3>
          <div className="space-y-3">
            {[{l:"MCP Status",d:"OAuth browser flow required",s:"Needs Auth",c:"badge-orange"},{l:"API Key",d:"cpk_****...TMRU",s:"Configured",c:"badge-green"},{l:"MCP Server",d:"clawpump-mcp-production.up.railway.app",s:"Online",c:"badge-green"},{l:"Tools",d:"96 read + 38 financial (opt-in)",s:"134 total",c:"badge-blue"}].map((item,i)=>(<div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]"><div><p className="text-sm font-semibold">{item.l}</p><p className="text-xs text-[#555570] mt-0.5">{item.d}</p></div><span className={"badge-glow "+item.c}>{item.s}</span></div>))}
          </div>
        </div>
        <div className="glass-card">
          <h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-5">Connect MCP (Required for Live Data)</h3>
          <div className="bg-black/30 rounded-2xl p-5 font-mono text-[13px] space-y-2 border border-white/[0.04]">
            <p className="text-[#00ff88]">$ ssh -i ~/.ssh/id_ed25519 master@188.166.121.13</p>
            <p className="text-[#aaaacc]">$ cd ~/clawpump-platform</p>
            <p className="text-[#00ff88]">$ .venv/bin/hermes clawpump setup</p>
            <p className="text-[#555570] mt-2"># Browser opens → authorize with ClawPump → done</p>
          </div>
        </div>
        <div className="glass-card">
          <h3 className="text-xs font-bold text-[#555570] uppercase tracking-[2px] mb-5">Platform Info</h3>
          <div className="grid grid-cols-2 gap-3">{[{l:"Version",v:"v0.17.0"},{l:"Upstream",v:"Hermes Agent"},{l:"Chain",v:"Solana"},{l:"Source",v:"ClawPump/claw-agent"},{l:"Tools",v:"134 MCP tools"},{l:"License",v:"MIT"}].map((item,i)=>(
            <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]"><span className="text-[11px] text-[#444460] uppercase tracking-wider">{item.l}</span><p className="text-sm font-semibold mt-1">{item.v}</p></div>))}</div>
        </div>
      </div>
    </div>
  );
}
