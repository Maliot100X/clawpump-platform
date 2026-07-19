"use client";
import PageHeader from "@/components/PageHeader";
export default function Settings() {
  return (
    <div><PageHeader title="Settings" subtitle="Platform configuration and MCP connection" />
      <div className="space-y-6">
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-4">ClawPump MCP Connection</h3>
          <div className="space-y-3">
            {[{l:"MCP Status",d:"OAuth browser flow required",s:"Needs Auth",c:"orange"},{l:"API Key",d:"cpk_****...TMRU",s:"Configured",c:"green"},{l:"MCP Server",d:"clawpump-mcp-production.up.railway.app",s:"Online",c:"green"},{l:"Tools",d:"96 read + 38 financial (opt-in)",s:"134 total",c:"blue"}].map((item,i)=>(<div key={i} className="flex items-center justify-between p-3 bg-[#12121e] rounded-lg"><div><p className="text-sm font-medium">{item.l}</p><p className="text-xs text-[#555577]">{item.d}</p></div><span className={"text-xs px-2 py-1 rounded "+(item.c==="green"?"bg-[#00ff8815] text-[#00ff88]":item.c==="orange"?"bg-[#f9731615] text-[#f97316]":"bg-[#3b82f615] text-[#3b82f6]")}>{item.s}</span></div>))}
          </div>
        </div>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-4">Connect MCP (Required for Live Data)</h3>
          <div className="bg-[#12121e] rounded-lg p-4 font-mono text-sm space-y-2">
            <p className="text-[#00ff88]"># On the Cloudways server:</p>
            <p className="text-[#e4e4ef]">ssh -i ~/.ssh/id_ed25519 master@188.166.121.13</p>
            <p className="text-[#e4e4ef]">cd ~/clawpump-platform</p>
            <p className="text-[#00ff88]">export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use 22</p>
            <p className="text-[#00ff88]">.venv/bin/hermes clawpump setup</p>
            <p className="text-[#8888aa] mt-2"># This opens a browser to authorize with ClawPump</p>
            <p className="text-[#8888aa]"># After auth, all 134 tools become available</p>
          </div>
        </div>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-4">Platform Info</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">{[{l:"Version",v:"v0.17.0"},{l:"Upstream",v:"Hermes Agent (Nous Research)"},{l:"Chain",v:"Solana"},{l:"Source",v:"github.com/Clawpump/claw-agent"},{l:"MCP Tools",v:"134 (96 read + 38 financial)"},{l:"Dashboard",v:"agents.clawpump.tech"}].map((item,i)=>(<div key={i} className="p-3 bg-[#12121e] rounded-lg"><span className="text-[#8888aa]">{item.l}:</span> {item.v}</div>))}</div>
        </div>
      </div>
    </div>
  );
}
