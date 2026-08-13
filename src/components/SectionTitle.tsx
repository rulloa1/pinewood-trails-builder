export function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="text-accent text-lg">🌲</span>
      <h2 className="section-heading text-2xl md:text-3xl text-primary-deep text-center">
        {children}
      </h2>
      <span className="text-accent text-lg">🌲</span>
    </div>
  );
}
