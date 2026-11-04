/**
 * Static hero sculpture reference for ?export=1 perception freeze.
 * Same artboard geometry as the WebGL column; replaces canvas for Figma capture.
 */
export function HeroExportFallback() {
  return (
    <div
      className="relative h-full w-full"
      data-oni-layer="content"
      data-oni-hero-fallback=""
      aria-hidden
    >
      <img
        src="/png/hero-sculpture.png"
        alt=""
        className="h-full w-full select-none object-contain object-center"
        draggable={false}
      />
    </div>
  );
}
