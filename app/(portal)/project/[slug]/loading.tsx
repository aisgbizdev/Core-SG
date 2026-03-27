export default function Loading() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 space-y-4 animate-pulse">
      <div className="h-8 w-40 bg-white/10 rounded-2xl loading-shine" />
      <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-4 loading-shine">
        <div className="h-5 w-64 bg-white/10 rounded-full" />
        <div className="h-4 w-40 bg-white/10 rounded-full" />
      </div>
      <div className="glass-panel rounded-3xl border border-white/10 min-h-[70vh] loading-shine" />
    </div>
  );
}
