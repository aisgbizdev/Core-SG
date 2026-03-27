export default function Loading() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto space-y-6">
      <section className="glass-panel rounded-3xl border border-white/10 p-6 space-y-4 loading-shine">
        <div className="h-8 w-40 bg-white/10 rounded-2xl" />
        <div className="h-5 w-72 bg-white/10 rounded-full" />
      </section>

      <section className="space-y-4">
        <div className="h-6 w-32 bg-white/10 rounded-full loading-shine" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl border border-white/10 p-5 space-y-3 loading-shine"
            >
              <div className="h-5 w-32 bg-white/10 rounded-full" />
              <div className="h-4 w-48 bg-white/10 rounded-full" />
              <div className="h-4 w-28 bg-white/10 rounded-full" />
              <div className="h-9 w-full bg-white/10 rounded-2xl" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
