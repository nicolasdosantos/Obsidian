interface AmbientGlowProps {
  className?: string;
}

export function AmbientGlow({ className = "" }: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[color:var(--electric)]/10 blur-3xl animate-float-slow" />
      <div className="absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-[color:var(--gold)]/10 blur-3xl animate-float-slow [animation-delay:-3s]" />
    </div>
  );
}
