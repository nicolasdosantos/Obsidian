interface EyebrowProps {
  index: number;
  label: string;
  className?: string;
}

export function Eyebrow({ index, label, className = "" }: EyebrowProps) {
  return (
    <div className={`text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground ${className}`}>
      <span className="inline-block text-gold animate-pulse-glow">◆</span>{" "}
      {String(index).padStart(2, "0")} — {label}
    </div>
  );
}
