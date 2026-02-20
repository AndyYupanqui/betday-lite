export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-border border-t-brand animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Cargando eventos...</p>
      </div>
    </div>
  );
}
