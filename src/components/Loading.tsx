export default function Loading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-[#00ff88]/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00ff88] animate-spin" />
      </div>
      <span className="text-[13px] text-[#555570] tracking-wider">{text}</span>
    </div>
  );
}
