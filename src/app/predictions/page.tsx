"use client";
import PageHeader from "@/components/PageHeader";
export default function Predictions() {
  return (<div><PageHeader title="Predictions" subtitle="Bet on real-world events with your agent wallet" />
    <div className="glass-card text-center py-20"><p className="text-5xl mb-4 animate-float">🎯</p><p className="text-xl font-bold mb-2">Prediction Markets</p><p className="text-[#555570] text-sm max-w-md mx-auto">Use predictions_open and predictions_close to bet on events. Connect ClawPump MCP to see available markets.</p></div></div>);
}
