"use client";
import { usePathname } from "next/navigation";

const pageNames: Record<string, string> = {
  "/": "Dashboard", "/agents": "Agents", "/trading": "Trading", "/tokens": "Token Launch",
  "/perps": "Phoenix Perps", "/dca": "DCA & Limits", "/lending": "Jupiter Lending",
  "/marketplace": "Marketplace", "/predictions": "Predictions", "/giftcards": "Gift Cards",
  "/mail": "Agent Mail", "/intelligence": "Intelligence", "/wallet": "Wallet",
  "/automations": "Automations", "/settings": "Settings",
};

export default function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 text-[11px] text-[#444460] mb-3 tracking-wider">
        <span className="text-[#00ff88] font-semibold">CLAWPUMP</span>
        <span className="text-[#333350]">/</span>
        <span className="text-[#666680] font-medium">{pageNames[path] || title}</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[32px] font-bold tracking-tight leading-none">{title}</h1>
          {subtitle && <p className="text-[#555570] text-[14px] mt-2">{subtitle}</p>}
        </div>
        <div className="flex gap-3">{children}</div>
      </div>
    </div>
  );
}
