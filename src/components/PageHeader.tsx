"use client";
import { usePathname } from "next/navigation";

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/agents": "Agents",
  "/trading": "Trading",
  "/tokens": "Token Launch",
  "/perps": "Phoenix Perps",
  "/dca": "DCA & Limits",
  "/lending": "Jupiter Lending",
  "/marketplace": "Marketplace",
  "/predictions": "Predictions",
  "/giftcards": "Gift Cards",
  "/mail": "Agent Mail",
  "/intelligence": "Intelligence",
  "/wallet": "Wallet",
  "/automations": "Automations",
  "/settings": "Settings",
};

export default function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#555577] mb-2">
        <span className="text-[#00ff88]">ClawPump</span>
        <span>/</span>
        <span className="text-[#8888aa]">{pageNames[path] || title}</span>
      </div>
      {/* Title row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-[#8888aa] text-sm mt-1">{subtitle}</p>}
        </div>
        <div className="flex gap-3">{children}</div>
      </div>
    </div>
  );
}
