export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 space-y-4 animate-pulse">
      <div className="h-8 bg-surface-2 rounded-xl w-48 mb-8" />
      {[1,2,3,4,5].map(i => (
        <div key={i} className="h-24 bg-surface-2 border border-border rounded-2xl" />
      ))}
    </div>
  );
}
