// The WEC emblem, rebuilt from three alpha masks (see logo/build_emblem.py) so the
// gold parts follow the accent colour and the silver parts follow the mode.
export const EMBLEM_ASPECT = 900 / 520;

export default function BrandEmblem({ className = "", shimmer = false, label }: {
  className?: string;
  shimmer?: boolean;
  label?: string;
}) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`brand-emblem ${shimmer ? "brand-emblem-shimmer" : ""} ${className}`}
      style={{ aspectRatio: String(EMBLEM_ASPECT) }}
    >
      <span className="emblem-layer emblem-gold" />
      <span className="emblem-layer emblem-silver" />
      <span className="emblem-layer emblem-shine" />
    </span>
  );
}
