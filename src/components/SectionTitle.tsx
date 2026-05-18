export function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="text-primary">🌲</span>
      <h2 className="font-display text-2xl md:text-3xl font-bold tracking-[0.25em] text-primary text-center">
        {children}
      </h2>
      <span className="text-primary">🌲</span>
    </div>
  );
}
