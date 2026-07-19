"use client";
import PageHeader from "@/components/PageHeader";
export default function Settings() {
  return (
    <div><PageHeader title="Settings" subtitle="Platform configuration and MCP connection" />
      <div className="space-y-6">
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-4">ClawPump MCP Connection</h3>
          <div className="space-y-3">
            {[{l:"MCP Status",d:"stdio via @clawpump/agents",s:"Connected",c:"green"},{l:"API Key",d:"cpk_****...TMRU",s:"Active",c:"green"},{l:"Tools",d:"96 read + 38 financial",s:"134 total",c:"blue"}].map((item,i)=>(<div key={i} className="flex items-center justify-between p-3 bg-[#12121e] rounded-lg"><div><p className="text-sm font-medium">{item.l}</p><p className="text-xs text-[#555577]">{item.d}</p></div><span className={"text-xs px-2 py-1 rounded "+(item.c==="green"?"bg-[#00ff8815] text-[#00ff88]":"bg-[#3b82f615] text-[#3b82f6]")}>{item.s}</span></div>))}
          </div>
        </div>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#8888aa] uppercase tracking-wider mb-4">Platform Info</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">{[{l:"Version",v:"v0.17.0"},{l:"Upstream",v:"Hermes Agent"},{l:"Chain",v:"Solana"},{l:"Source",v:"ClawPump/claw-agent"}].map((item,i)=>(<div key={i} className="p-3 bg-[#12121e] rounded-lg"><span className="text-[#8888aa]">{item.l}:</span> {item.v}</div>))}</div>
        </div>
      </div>
    </div>
  );
}
