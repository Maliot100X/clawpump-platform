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

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-56 bg-[#0c0c18] border-r border-[#2a2a4a] flex flex-col z-50">
      {/* Logo */}
      <div className="p-4 border-b border-[#2a2a4a] shrink-0">
        <h1 className="text-lg font-bold bg-gradient-to-r from-[#00ff88] to-[#3b82f6] bg-clip-text text-transparent">
          ClawPump
        </h1>
        <p className="text-[10px] text-[#555577] mt-0.5">134 Tools · Solana</p>
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto py-1 min-h-0">
        {tabs.map(t => {
          const active = path === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex items-center gap-2.5 mx-2 my-0.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                active
                  ? "bg-[#00ff88] text-black shadow-[0_0_12px_rgba(0,255,136,0.3)]"
                  : "text-[#8888aa] hover:text-white hover:bg-[#1a1a2e]"
              }`}
            >
              <span className="text-sm w-5 text-center">{t.icon}</span>
              <span>{t.name}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-black opacity-40" />}
            </Link>
          );
        })}
      </nav>

      {/* Status */}
      <div className="p-3 border-t border-[#2a2a4a] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
          <span className="text-[11px] text-[#8888aa]">Connected</span>
        </div>
        <p className="text-[10px] text-[#555577] mt-1">ClawPump v0.17.0</p>
      </div>
    </aside>
  );
}
