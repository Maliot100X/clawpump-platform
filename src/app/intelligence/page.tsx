"use client";
import PageHeader from "@/components/PageHeader";
export default function Intelligence() {
  const caps = [{n:"Market Intelligence",d:"Real-time market data and analysis",i:"📊"},{n:"Trading Signals",d:"AI-powered buy/sell signals",i:"📡"},{n:"Macro Analysis",d:"Macro indicators and news",i:"🌍"},{n:"Perps Intelligence",d:"Perpetual futures data",i:"⚡"},{n:"News Feed",d:"Latest crypto news",i:"📰"}];
  return (<div><PageHeader title="Market Intelligence" subtitle="AI-powered market data, signals, and analysis" /><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{caps.map((c,i)=>(<div key={i} className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 hover:border-[#ef4444] transition-all"><div className="text-3xl mb-3">{c.i}</div><p className="font-semibold">{c.n}</p><p className="text-xs text-[#8888aa] mt-1">{c.d}</p><div className="mt-3"><span className="text-xs px-2 py-1 rounded bg-[#00ff8815] text-[#00ff88]">Available</span></div></div>))}</div></div>);
}
