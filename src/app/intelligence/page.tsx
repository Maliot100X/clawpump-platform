"use client";
import PageHeader from "@/components/PageHeader";
export default function Intelligence() {
  const caps = [{n:"Market Intelligence",d:"Real-time market data and analysis",i:"📊",c:"from-[#00ff88]/10 to-transparent"},{n:"Trading Signals",d:"AI-powered buy/sell signals",i:"📡",c:"from-[#3b82f6]/10 to-transparent"},{n:"Macro Analysis",d:"Macro indicators and news",i:"🌍",c:"from-[#a855f7]/10 to-transparent"},{n:"Perps Intelligence",d:"Perpetual futures data",i:"⚡",c:"from-[#f97316]/10 to-transparent"},{n:"News Feed",d:"Latest crypto news",i:"📰",c:"from-[#06b6d4]/10 to-transparent"}];
  return (<div><PageHeader title="Market Intelligence" subtitle="AI-powered market data, signals, and analysis" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{caps.map((c,i)=>(
      <div key={i} className={`glass-card bg-gradient-to-br ${c.c} group`}><div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{c.i}</div><p className="font-bold mb-1">{c.n}</p><p className="text-xs text-[#555570]">{c.d}</p><div className="mt-4"><span className="badge-glow badge-green">Available</span></div></div>))}</div></div>);
}
