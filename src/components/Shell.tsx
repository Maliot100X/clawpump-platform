"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main className={`flex-1 ${collapsed ? "ml-14" : "ml-56"} p-6 overflow-auto min-h-screen transition-all duration-200`}>
        {children}
      </main>
    </>
  );
}
