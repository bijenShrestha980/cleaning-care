export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="min-h-screen w-full flex items-center justify-center"
    >
      <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
