// The WEC emblem as layers built by scripts/build_emblem.py: gold and silver shapes
// filled by theme colours, with the original artwork's shading multiplied on top.
export const EMBLEM_ASPECT = 900 / 521;

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
      <span className="emblem-layer emblem-shade" />
      <span className="emblem-layer emblem-shine" />
    </span>
  );
}
