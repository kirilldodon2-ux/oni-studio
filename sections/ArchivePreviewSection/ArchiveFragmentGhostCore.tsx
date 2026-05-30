import Image from "next/image";

/**
 * Gravitational nucleus for the archive fragment field.
 * ONI mark only — discovered, never announced.
 */
export function ArchiveFragmentGhostCore() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[44%] z-0 -translate-x-1/2 -translate-y-1/2 select-none lg:top-[44%] lg:z-[1]"
      aria-hidden
    >
      <div className="oni-archive-ghost-core relative h-[min(90vw,18rem)] w-[min(90vw,18rem)] lg:h-[min(36vw,28rem)] lg:w-[min(36vw,28rem)]">
        <Image
          src="/logo/oni_logo_black.svg"
          alt=""
          fill
          className="object-contain opacity-100"
          style={{
            filter: "invert(0.35) sepia(0.08) saturate(0.2) hue-rotate(180deg)",
          }}
          sizes="(max-width: 1024px) 72vw, 34vw"
          priority={false}
        />
      </div>
    </div>
  );
}
