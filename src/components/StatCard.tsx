export default function StatCard({label,value,change,color="green"}:{label:string;value:string;change?:string;color?:string}){
  const c:Record<string,string>={green:"from-[#00ff88] to-[#00cc6a]",blue:"from-[#3b82f6] to-[#2563eb]",purple:"from-[#8b5cf6] to-[#7c3aed]",red:"from-[#ef4444] to-[#dc2626]",orange:"from-[#f97316] to-[#ea580c]",cyan:"from-[#06b6d4] to-[#0891b2]"};
  return(
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl p-5 relative overflow-hidden">
      <div className={"absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r "+(c[color]||c.green)}/>
      <p className="text-xs text-[#8888aa] uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
      {change&&<p className={"text-xs mt-1 "+(change.startsWith("+")?"text-[#00ff88]":"text-[#ef4444]")}>{change}</p>}
    </div>
  );
}
