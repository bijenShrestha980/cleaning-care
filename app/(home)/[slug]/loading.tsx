export default function Loading() {
  return (
    <div className="min-h-screen w-full">
      <div className="h-[530px] w-full bg-gradient-to-br from-[#8CC540]/20 to-[#4F8520]/20 animate-pulse" />
      <div className="p-5 md:p-10 space-y-6 max-w-[1200px] mx-auto">
        <div className="h-8 bg-muted rounded animate-pulse w-3/4 mx-auto" />
        <div className="h-4 bg-muted rounded animate-pulse w-2/3 mx-auto" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2 mx-auto" />
      </div>
    </div>
  );
}
