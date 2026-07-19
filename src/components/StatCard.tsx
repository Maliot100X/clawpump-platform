export default function StatCard({ label, value, change, color = "green", icon }: {
  label: string; value: string; change?: string; color?: string; icon?: string;
}) {
  const gradients: Record<string, string> = {
    green: "from-[#00ff88]/10 to-transparent",
    blue: "from-[#3b82f6]/10 to-transparent",
    purple: "from-[#a855f7]/10 to-transparent",
    red: "from-[#ef4444]/10 to-transparent",
    orange: "from-[#f97316]/10 to-transparent",
    cyan: "from-[#06b6d4]/10 to-transparent",
  };
  const accents: Record<string, string> = {
    green: "#00ff88", blue: "#3b82f6", purple: "#a855f7",
    red: "#ef4444", orange: "#f97316", cyan: "#06b6d4",
  };
  const accent = accents[color] || accents.green;
  return (
    <div className={`stat-card bg-gradient-to-br ${gradients[color] || gradients.green}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-[11px] text-[#555570] uppercase tracking-[1.5px] font-semibold">{label}</p>
        {icon && <span className="text-lg opacity-60">{icon}</span>}
      </div>
      <p className="text-[28px] font-bold tracking-tight" style={{ color: accent }}>{value}</p>
      {change && (
        <p className={`text-[12px] mt-2 font-medium ${change.startsWith("+") ? "text-[#00ff88]" : "text-[#ef4444]"}`}>
          {change}
        </p>
      )}
    </div>
  );
}
