export default function Label({ index, children }) {
  return (
    <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-gold">
      <span>{index}</span>
      <span className="h-px w-10 bg-gold/40" />
      <span>{children}</span>
    </p>
  );
}
