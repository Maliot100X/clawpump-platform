"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Dashboard", href: "/", icon: "📊" },
  { name: "Agents", href: "/agents", icon: "🤖" },
  { name: "Trading", href: "/trading", icon: "📈" },
  { name: "Tokens", href: "/tokens", icon: "🪙" },
  { name: "Perps", href: "/perps", icon: "⚡" },
  { name: "DCA", href: "/dca", icon: "🔄" },
  { name: "Lending", href: "/lending", icon: "🏦" },
  { name: "Marketplace", href: "/marketplace", icon: "🛒" },
  { name: "Predictions", href: "/predictions", icon: "🎯" },
  { name: "Gift Cards", href: "/giftcards", icon: "🎁" },
  { name: "Agent Mail", href: "/mail", icon: "📧" },
  { name: "Intelligence", href: "/intelligence", icon: "🧠" },
  { name: "Wallet", href: "/wallet", icon: "💰" },
  { name: "Automations", href: "/automations", icon: "⚙️" },
  { name: "Settings", href: "/settings", icon: "🔧" },
];

export default function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const path = usePathname();
  return (
    <aside className={`fixed left-0 top-0 bottom-0 ${collapsed ? "w-[60px]" : "w-[240px]"} bg-[#08081a]/90 backdrop-blur-xl border-r border-white/[0.04] flex flex-col z-50 transition-all duration-300 ease-out`}>
      {/* Logo */}
      <div className={`p-4 ${collapsed ? "px-2" : ""} border-b border-white/[0.04] shrink-0 flex items-center justify-between`}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#3b82f6] flex items-center justify-center text-black font-black text-sm shadow-lg shadow-[#00ff88]/20">C</div>
            <div>
              <h1 className="text-[15px] font-bold text-gradient">ClawPump</h1>
              <p className="text-[10px] text-[#555570] tracking-wider">134 TOOLS</p>
            </div>
          </div>
        )}
        <button onClick={onToggle}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/[0.05] transition-all text-[#555570] hover:text-[#00ff88] shrink-0"
          title={collapsed ? "Expand" : "Collapse"}>
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 min-h-0">
        <div className={`${collapsed ? "px-1.5" : "px-3"} space-y-0.5`}>
          {tabs.map(t => {
            const active = path === t.href;
            return (
              <Link key={t.href} href={t.href} title={collapsed ? t.name : undefined}
                className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} ${collapsed ? "px-0 py-2.5" : "px-3 py-2.5"} rounded-xl text-[13px] font-medium transition-all duration-200 relative ${
                  active
                    ? "bg-gradient-to-r from-[#00ff88]/15 to-transparent text-[#00ff88] shadow-[inset_0_0_20px_rgba(0,255,136,0.05)]"
                    : "text-[#666680] hover:text-[#aaaacc] hover:bg-white/[0.03]"
                }`}>
                {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#00ff88] shadow-[0_0_12px_rgba(0,255,136,0.5)]" />}
                <span className="text-[15px] w-5 text-center shrink-0">{t.icon}</span>
                {!collapsed && <span className="truncate">{t.name}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Status */}
      {!collapsed && (
        <div className="p-4 border-t border-white/[0.04] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.5)]" />
            <span className="text-[11px] text-[#666680] tracking-wide">CONNECTED</span>
          </div>
          <p className="text-[10px] text-[#333350] mt-1.5 tracking-wider">v0.17.0 · SOLANA</p>
        </div>
      )}
    </aside>
  );
}
