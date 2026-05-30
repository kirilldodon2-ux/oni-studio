import Image from "next/image";

/**
 * Gravitational nucleus — mobile brandbook landing only.
 * Hidden structural force, not a hero object.
 */
export function BrandbookHeroGhostCore() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[44%] z-0 -translate-x-1/2 -translate-y-1/2 select-none"
      aria-hidden
    >
      <div className="oni-archive-ghost-core oni-brandbook-ghost-core relative h-[min(92vw,19rem)] w-[min(92vw,19rem)]">
        <Image
          src="/logo/oni_logo_black.svg"
          alt=""
          fill
          className="object-contain"
          style={{
            filter: "invert(0.35) sepia(0.08) saturate(0.2) hue-rotate(180deg)",
          }}
          sizes="92vw"
          priority={false}
        />
      </div>
    </div>
  );
}
